// zoom/ZoomSdkProvider.jsx
import React, { useContext, useEffect, useMemo } from "react";
import ZoomVideo from "@zoom/videosdk";
import { MeetingContext } from "../MeetingContext";

const ZoomCtx = React.createContext(null);
export const useZoom = () => {
  const v = React.useContext(ZoomCtx);
  if (!v) throw new Error("useZoom must be used within <ZoomSdkProvider/>");
  return v;
};

export const ZoomProvider = ({ children }) => {
  const { meeting } = useContext(MeetingContext);

  // stable client instance per meeting.id (similar to your key={meeting.id})
  const client = useMemo(() => ZoomVideo.createClient(), [meeting.id]);

  // init once per client
  useEffect(() => {
    client.init("en-US", "Global");
    return () => {
      // best-effort leave/cleanup when meeting.id changes or unmounts
      client.leave().catch(() => {});
    };
  }, [client]);

  // ---- JOIN / LEAVE ----
  useEffect(() => {
    let cancelled = false;

    async function join() {
      if (!meeting?.id) return;

      // 🔐 Get a Zoom Video SDK signature.
      // If you already set meeting.token from your backend, you can reuse it here.
      // Otherwise, swap this fetch for your own endpoint.
      let signature = meeting.token;
      if (!signature) {
        const res = await fetch(
          `/api/videosdk-signature?topic=${encodeURIComponent(meeting.id)}`
        );
        const data = await res.json();
        signature = data.signature;
      }
      if (cancelled) return;

      const userName = meeting?.visitor?.name || "Guest";
      const password = meeting?.options?.password;

      await client.join(meeting.id, signature, userName, password);

      const stream = client.getMediaStream();

      // Respect initial mic/webcam flags (like VideoSDK.live did)
      try {
        if (meeting.micOn) await stream.startAudio();
        if (meeting.camOn) await stream.startVideo();
      } catch (e) {
        // mic/cam permission issues are common—handle gracefully
        // console.warn(e);
      }
    }

    if (meeting?.autoJoin) join();

    return () => {
      cancelled = true;
    };
  }, [client, meeting.id, meeting.autoJoin, meeting.token]);

  // ---- KEEP MIC/CAM IN SYNC WITH FLAGS ----
  useEffect(() => {
    const stream = client.getMediaStream?.();
    if (!stream) return;

    let ignore = false;
    (async () => {
      try {
        if (meeting.micOn) await stream.startAudio();
        else await stream.stopAudio();
      } catch (err) {
        console.error(err);
      }
      try {
        if (meeting.camOn) await stream.startVideo();
        else await stream.stopVideo();
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [client, meeting.micOn, meeting.camOn]);

  const value = useMemo(
    () => ({
      client,
      get stream() {
        try {
          return client.getMediaStream?.();
        } catch {
          return null;
        }
      },
      // convenience helpers
      startAudio: () => client.getMediaStream?.().startAudio(),
      stopAudio: () => client.getMediaStream?.().stopAudio(),
      startVideo: () => client.getMediaStream?.().startVideo(),
      stopVideo: () => client.getMediaStream?.().stopVideo(),
      leave: () => client.leave(),
    }),
    [client]
  );

  return <ZoomCtx.Provider value={value}>{children}</ZoomCtx.Provider>;
}
