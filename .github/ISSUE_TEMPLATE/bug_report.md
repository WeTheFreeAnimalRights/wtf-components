name: Bug Report
description: Report something that isn't working as expected
title: "[BUG] <your title here>"
labels: [bug]
body:
  - type: input
    id: environment
    attributes:
      label: Environment
      placeholder: "Browser/OS/App version"
  - type: textarea
    id: description
    attributes:
      label: Describe the bug
      placeholder: "What happened? Steps to reproduce?"
      description: Please be specific.
    validations:
      required: true
