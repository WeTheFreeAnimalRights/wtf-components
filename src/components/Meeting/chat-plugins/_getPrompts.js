export const _getPrompts = () => {
    return [
        {
            label: 'Powerful Questions',
            name: 'powerful-questions',
            type: 'prompts',
            items: [
                {
                    name: 'Seen',
                    items: [
                        'Have you seen this type of footage before?',
                        'Where have you seen it?',
                    ],
                },
                {
                    name: 'Feel',
                    items: [
                        'How do you feel when you see this?',
                        'What specifically makes you feel this way?',
                        'What is it about animals being treated this way that bothers you?',
                        'How do you think the animals feel?',
                    ],
                },
                {
                    name: 'Problem',
                    items: [
                        'Given that most people are against this, what do you think causes it to happen?',
                        'What else do you think causes it?',
                        'Do you think we have to do this to animals, to be healthy, to be happy and to live a good life?',
                    ],
                },
                {
                    name: 'Solution',
                    items: [
                        "Given that we don't have to do this to animals, what can we do to stop it from happening?",
                        'What would be the most difficult thing for you?',
                        'Would that be too difficult for you?',
'What would be the most difficult thing?',
                    ],
                },
            ],
        },
        {
            label: 'Objection Handling',
            name: 'objection-handling',
            type: 'indications',
            items: [
                {
                    title: "Listen, don't interrupt.",
                    description:
                        'It should be 20% you and 80% them. Try to pick out key points in their answer.',
                },
                {
                    title: 'Acknowledge',
                    description:
                        "Show that you've listened to them. For example, “If I understand you correctly, this bothers you but your concern is *insert objection*, is that correct?”",
                },
                {
                    title: 'Empathise and relate',
                    description:
                        "Show them that you have something in common or that you relate to them. Use feel, felt, found. I know how you feel, I felt the same way, but what I found is. For example, “I completely understand how you feel, I used to think I wouldn't get enough protein on a vegan diet too, but what I found is that it's actually really easy to meet your protein requirements”",
                },
                {
                    title: 'Ask questions (past, present & future)',
                    description:
                        'Identify a time in their life where they solved a similar problem to this or are solving it right now and get them to apply it to the problem they have now or in the future. For example, “How did you learn about your protein requirements? How did you find out which protein to buy? How did you discover which foods were high in protein? Can you use this experience to help you in finding high protein foods on a vegan diet too?”',
                },
                {
                    title: 'Reiterate & validate',
                    description:
                        "Confirm your understanding and validate that they're going to do a good thing. For example, “So you're going to research some high-protein vegan recipes. That's amazing. Let's say you try this new vegan pasta recipe and you think it's delicious. It's nutritious and it's high in protein. But the main difference is that no animals suffered to create this meal. How will you feel about that?”",
                },
                {
                    title: 'Present Solution',
                    description:
                        'Offer your expert advice or give them any information they might need. For example, mention some vegan products you like, send through the link to a documentary that is related to their problem, or get them signed up to a challenge.',
                },
                {
                    title: 'Gain Agreement',
                    description:
                        "Give them a call to action or hold them to account. For example “It's been great chatting to you today. Will you do it?”, “What will you do differently today after having this conversation?”, or “If you were in the animals position, how quickly would you want the person to adopt a vegan lifestyle?”. They may come up with another objection which you can deal with next.",
                },
            ],
        },
        {
            label: 'Common Objections',
            name: 'common-objections',
            type: 'objections',
            items: [
    {
        title: 'Health Objections',
        items: [
            'How did you learn to meet your health needs in the past? What did you research?',
            'How do you currently prioritize your health? What steps do you take?',
            'If you decided to go vegan, how would you ensure that you get all the right nutrients? What research would you do? Who would you ask?',
            'What steps would you take to learn how to meet your specific health needs on a vegan diet? What research would you do? Who would you ask?'
        ]
    },
    {
        title: 'Taste Objections',
        items: [
            'What are your favorite meals? Do you usually cook, or eat out?',
            'How did you learn to cook? How did you find recipes?',
            'How did you learn which restaurants are your favorite - trial & error, or research?',
            'How would you go about making your favorite meal but as a vegan? What research would you do? How would you decide on a recipe?',
            'How would you find vegan options for takeouts or restaurants? How would you decide which ones to try?',
            'How would you find out if your favorite restaurant or takeout can provide vegan options for you to try? What would you say to them?'
        ]
    },
    {
        title: 'Cost Objections',
        items: [
            'How do you currently manage your budget?',
            'When you shop for groceries, what tend to be the more expensive food types?',
            'How did you learn how to manage a budget?',
            'How would you learn to budget on a vegan diet?'
        ]
    },
    {
        title: 'Convenience Objections',
        items: [
            'Has there been a time in your life where you needed to plan ahead?',
            'How do you currently deal with inconveniences?',
            'How will you find out what vegan options are available?',
            'As a vegan, how would you plan ahead to make sure that you have options available wherever you go?'
        ]
    },
    {
        title: 'Social Pressure Objections',
        items: [
            'Has there been a time in your life when you needed another person to support you with something, even when they didn’t understand it themselves?',
            'How did you ask that person for support?',
            'Has there ever been a time where you had to embrace being different because of something that’s important to you?',
            'As a new vegan, how would you go about asking others to support you?'
        ]
    },
    {
        title: 'Religious Objections',
        items: [
            'How did you learn how to be a good Christian?',
            'Who did you ask?',
            'Did you ever make a mistake?',
            'What are the guiding principles or values of your faith? Are those guiding principles compatible with veganism?',
            'If you wanted to be a good Christian AND adopt a vegan lifestyle, where would you start?',
            'Who could you ask for advice?',
            'What kind of research would you do?'
        ]
    }
],
        },
    ];
};
