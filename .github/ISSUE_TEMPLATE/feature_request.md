name: Feature Request
description: Suggest a new feature or enhancement
title: "[FEATURE] <your title here>"
labels: [enhancement]
body:
  - type: input
    id: summary
    attributes:
      label: Feature Summary
      placeholder: "Add dark mode toggle in settings"
    validations:
      required: true
  - type: textarea
    id: problem
    attributes:
      label: What's the problem this feature will solve?
      description: Explain the pain point or need.
      placeholder: "Sometimes I work late and the white screen hurts my eyes."
  - type: textarea
    id: solution
    attributes:
      label: Suggested solution or idea
      placeholder: "Introduce a dark mode toggle in the settings menu."
    validations:
      required: true
  - type: textarea
    id: additional
    attributes:
      label: Additional context or alternatives considered
      placeholder: "Could also auto-detect based on system theme."
