var demographics_browser_info = {
    type: jsPsychBrowserCheck,
    data: {
        screen: "browser_info",
        date: new Date().toLocaleDateString("fr-FR"),
        time: new Date().toLocaleTimeString("fr-FR"),
    },
    on_finish: function (data) {
        dat = jsPsych.data.get().filter({ screen: "browser_info" }).values()[0]

        // Rename
        data["screen_height"] = dat["height"]
        data["screen_width"] = dat["width"]

        // Add URL variables - ?sona_id=x&exp=1
        let urlvars = jsPsych.data.urlVariables()
        data["researcher"] = urlvars["exp"]
        data["sona_id"] = urlvars["sona_id"]
        data["prolific_id"] = urlvars["PROLIFIC_PID"] // Prolific
        data["study_id"] = urlvars["STUDY_ID"] // Prolific
        data["session_id"] = urlvars["SESSION_ID"] // Prolific
    },
}

var demographics_consent = {
    type: jsPsychHtmlButtonResponse,
    stimulus:
        // Logo and title
        "<img src='https://blogs.brighton.ac.uk/sussexwrites/files/2019/06/University-of-Sussex-logo-transparent.png' width='150px' align='right'/><br><br><br><br><br>" +
        "<h1>Informed Consent</h1>" +
        "Welcome to the Nature & Cognition Research" +
        // Overview
        "<p align='left'><b>Invitation to Take Part</b><br>" +
        "You are being invited to take part in a research study to further our understanding of the effects on nature on behaviors, thougths and feelings. Thank you for carefully reading this information sheet. This study is being conducted by Dr Dominique Makowski from the School of Psychology, University of Sussex, who is happy to be contacted (D.Makowski@sussex.ac.uk) if you have any questions.</p>" +
        // Description
        "<p align='left'><b>Why have I been invited and what will I do?</b><br>" +
        "We are surveying people of different age groups to understand how nature and cognition correlate together. This study contains various questionnaires about your personality, feelings and current state of mind. The entire study will take you <b>about 30 min</b> to complete. All data collected in this study are for research purposes only. It is important to the study results that you sit through all the questionnaires of the study. It is particularly important that you pay attention to the short video clips and watch them while wearing <b>Headphones</b>. Please make you sure that you are in a quiet environment, and that you have time to complete it in one go.</p>" +
        // Results and personal information
        "<p align='left'><b>What will happen to the results and my personal information?</b><br>" +
        "The results of this research may be written into a scientific publication. Your anonymity will be ensured in the way described in the consent information below. Please read this information carefully and then, if you wish to take part, please acknowledge that you have fully understood this sheet, and that you consent to take part in the study as it is described here.</p>" +
        "<p align='left'><b>Consent</b><br></p>" +
        // Bullet points
        "<li align='left'>I understand that by signing below I am agreeing to take part in the University of Sussex research described here, and that I have read and understood this information sheet</li>" +
        "<li align='left'>I understand that my participation is entirely voluntary, that I can choose not to participate in part or all of the study, and that I can withdraw at any stage by closing the browser without having to give a reason and without being penalised in any way (e.g., if I am a student, my decision whether or not to take part will not affect my grades).</li>" +
        "<li align='left'>I understand that since the study is anonymous, it will be impossible to withdraw my data once I have completed and submitted the test/questionnaire.</li>" +
        "<li align='left'>I understand that my personal data will be used for the purposes of this research study and will be handled in accordance with Data Protection legislation. I understand that the University's Privacy Notice provides further information on how the University uses personal data in its research.</li>" +
        "<li align='left'>I understand that my collected data will be stored in a de-identified way. De-identified data may be made publically available through secured scientific online data repositories.</li>" +
        // Incentive
        "<li align='left'>Please note that various checks will be performed to ensure the validity of the data. Should we detect non-valid responses (e.g., random patterns of answers, instructions not read, ...), your participation will be excluded.</li>" +
        "<li align='left'>By participating, you agree to follow the instructions and provide honest answers. If you do not wish to participate, simply close your browser.</li>" +
        "</p>" +
        "<p align='left'><br><sub><sup>For further information about this research, or if you have any concerns, please contact Dr Dominique Makowski (D.Makowski@sussex.ac.uk). This research has been approved (ER/NAAA21/1) by the ethics board of the School of Psychology. The University of Sussex has insurance in place to cover its legal liabilities in respect of this study.</sup></sub></p>",
    choices: ["I read, understood, and I consent"],
    data: { screen: "consent" },
}
var demographic_questionnaire = {
    type: jsPsychSurvey,
    survey_json: {
        title: "About yourself",
        // description:
        //     "Please answer the following questions based on how accurately each statement describes you in general.",
        completeText: "Continue",
        showQuestionNumbers: false,
        // goNextPageAutomatic: true,
        pageNextText: "Next",
        pagePrevText: "Previous",
        showProgressBar: "aboveHeader",
        pages: [
            {
                name: "page1",
                elements: [
                    {
                        title: "What is your gender?",
                        name: "Gender",
                        type: "radiogroup",
                        choices: ["Male", "Female", "Other"],
                        isRequired: true,
                        colCount: 0,
                    },
                    {
                        type: "text",
                        title: "Please enter your age (in years)",
                        name: "Age",
                        isRequired: true,
                        inputType: "number",
                        min: 0,
                        max: 100,
                        // defaultValue: 0,
                    },
                ],
            },
            {
                elements: [
                    {
                        title: "What is your highest completed education level?",
                        name: "Education",
                        type: "radiogroup",
                        choices: [
                            {
                                value: "Doctorate",
                                text: "University (doctorate)",
                            },
                            {
                                value: "Master",
                                text: "University (master)", // "<sub><sup>or equivalent</sup></sub>",
                            },
                            {
                                value: "Bachelor",
                                text: "University (bachelor)", // "<sub><sup>or equivalent</sup></sub>",
                            },
                            {
                                value: "High school",
                                text: "High school",
                            },
                            {
                                value: "Elementary school",
                                text: "Elementary school",
                            },
                        ],
                        showOtherItem: true,
                        otherText: "Other",
                        otherPlaceholder: "Please specify",
                        isRequired: true,
                        colCount: 1,
                    },
                    {
                        visibleIf:
                            "{Education} == 'Doctorate' || {Education} == 'Master' || {Education} == 'Bachelor'",
                        title: "What is your discipline?",
                        name: "Discipline",
                        type: "radiogroup",
                        choices: [
                            "Arts and Humanities",
                            "Literature, Languages",
                            "History, Archaeology",
                            "Sociology, Anthropology",
                            "Political Science, Law",
                            "Business, Economics",
                            "Psychology, Neuroscience",
                            "Medicine",
                            "Biology, Chemistry, Physics",
                            "Mathematics, Physics",
                            "Engineering, Computer Science",
                        ],
                        showOtherItem: true,
                        otherText: "Other",
                        otherPlaceholder: "Please specify",
                    },
                    {
                        visibleIf:
                            "{Education} == 'High school' || {Education} == 'Master' || {Education} == 'Bachelor'",
                        title: "Are you currrently a student?",
                        name: "Student",
                        type: "boolean",
                        swapOrder: true,
                        isRequired: true,
                    },
                ],
            },
            {
                elements: [
                    {
                        title: "How would you describe your ethnicity?",
                        name: "Ethnicity",
                        type: "radiogroup",
                        choices: [
                            "White",
                            "Black",
                            "Hispanic/Latino",
                            "Middle Eastern/North African",
                            "South Asian",
                            "East Asian",
                            "Southeast Asian",
                            "Mixed",
                            "Prefer not to say",
                        ],
                        showOtherItem: true,
                        otherText: "Other",
                        otherPlaceholder: "Please specify",
                        isRequired: false,
                        colCount: 1,
                    },
                    {
                        title: "In which country are you currently living?",
                        name: "Country",
                        type: "text",
                        placeholder: "e.g., France",
                        isRequired: false,
                    },
                ],
            },
        ],
    },
    data: {
        screen: "demographic_questionnaire",
    },
}

var demographics_waitdatasaving = {
    type: jsPsychHtmlButtonResponse,
    stimulus:
        "<p>Done! now click on 'Continue' and <b>wait until your responses have been successfully saved</b> before closing the tab.</p> ",
    choices: ["Continue"],
    data: { screen: "waitdatasaving" },
}

var rrs_questionnaire_long = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: "Think about how alone you feel",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_1",
        },
        {
            prompt: "Think i won't be able to do my job if i don't snap out of this",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_2",
        },
        {
            prompt: "Think about your feelings of fatigue and achiness",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_3",
        },
        {
            prompt: "Think about how hard it is to concentrate",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_4",
        },
        {
            prompt: "Think what am i doing to deserve this?",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_5",
        },
        {
            prompt: "Think about how passive and unmotivated you feel",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_6",
        },
        {
            prompt: "Analyze recent events to try to understand why you are depressed",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_7",
        },
        {
            prompt: "Think about how you don't seem to feel anything anymore",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_8",
        },
        {
            prompt: "Think why can't i get going?",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_9",
        },
        {
            prompt: "Think why do i always react this way?",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_10",
        },
        {
            prompt: "Go away by yourself and think about why you feel this way",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_11",
        },
        {
            prompt: "Write down what you are thinking and analyze it",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_12",
        },
        {
            prompt: "Think about a recent situation, wishing it had gone better",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_13",
        },
        {
            prompt: "Think i won't be able to concentrate if i keep feeling this way",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_14",
        },
        {
            prompt: "Think why do i have problems other people don't have?",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_15",
        },
        {
            prompt: "Please click the option Almost never (1)",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "AttentionCheck_1",
        },
        {
            prompt: "Think why can't i handle things better?",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_16",
        },
        {
            prompt: "Think about how sad you feel",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_17",
        },
        {
            prompt: "Think about all your shortcomings, failings, faults, mistakes",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_18",
        },
        {
            prompt: "Think about how you don't feel up to doing anything",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_19",
        },
        {
            prompt: "Analyze your personality to try to understand why you are depressed",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_20",
        },
        {
            prompt: "Go someplace alone to think about your feelings",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_21",
        },
        {
            prompt: "Think about how angry you are with yourself",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRS_22",
        },
    ],
    preamble:
        "<p>Instructions for Completing this scale: Please read each statement and indicate how often you experience these thoughts or behaviors when you feel down or upset. Use the following scale to rate your responses: 1. Almost never 2. Sometimes 3. Often 4. Almost always. Select the number that best reflects your typical response. There are no right or wrong answers, so please be as honest as possible.</p>",
    button_label: "Next",
    required: true,
    data: { screen: "rrs-questionnaire_long" },
}



// IAS questionnaire ========================================================================
var IAS_items = [
    "I can always accurately perceive when my heart is beating fast",
    "I can always accurately perceive when I am hungry",
    "I can always accurately perceive when I am breathing fast",
    "I can always accurately perceive when I am thirsty",
    "I can always accurately perceive when I need to urinate",
    "I can always accurately perceive when I need to defecate",
    "I can always accurately perceive when I encounter different tastes",
    "I can always accurately perceive when I am about to blink", // Attentional check
    "I can always accurately perceive when I am going to vomit",
    "I can always accurately perceive when I am going to sneeze",
    "I can always accurately perceive when I am going to cough",
    "I can always accurately perceive when I am hot/cold",
    "I can always accurately perceive when I am sexually aroused",
    "I can always accurately perceive when I am going to pass wind",
    "I can always accurately perceive when I am going to burp",
    "I can always accurately perceive when my muscles are tired/sore",
    "I can always accurately perceive when I am going to get a bruise",
    "I can always accurately perceive when I am in pain",
    "I can always accurately perceive when my blood sugar is low",
    "I can always accurately perceive when someone is touching me affectionately rather than non-affectionately",
    "I can always accurately perceive when something is going to be ticklish",
    "I can always accurately perceive when something is going to be itchy",
]
var IAS_dimensions = [
    "IAS_1",
    "IAS_2",
    "IAS_3",
    "IAS_4",
    "IAS_5",
    "IAS_6",
    "IAS_7",
    "AttentionCheck_2",
    "IAS_8",
    "IAS_9",
    "IAS_10",
    "IAS_11",
    "IAS_12",
    "IAS_13",
    "IAS_14",
    "IAS_15",
    "IAS_16",
    "IAS_17",
    "IAS_18",
    "IAS_19",
    "IAS_20",
    "IAS_21",
]

var ias_questions = []
for (const [index, element] of IAS_items.entries()) {
    ias_questions.push({
        prompt: "<b>" + element + "</b>",
        name: IAS_dimensions[index],
        ticks: ["Strongly Disagree", "Strongly Agree"],
        required: true,
        min: 0,
        max: 1,
        step: 0.01,
        slider_start: 0.5,
    })
}

var ias_questionnaire = {
    type: jsPsychSurveySlider,
    questions: ias_questions,
    randomize_question_order: true,
    preamble:
        "<h2>About your body sensations...</h2>" +
        "<p style='text-align: left;'>Below are several statements regarding how accurately you can perceive specific bodily sensations. Please rate on the scale how well you believe you can perceive each specific signal.</p>" +
        "<p style='text-align: left;'>For example, if you often feel you need to urinate and then realise you do not need to when you go to the toilet, you would rate your accuracy perceiving this bodily signal as low.</p>" +
        "<p style='text-align: left;'>Please only rate how well you can perceive these signals without using external cues. For example, if you can only perceive how fast your heart is beating when you measure it by taking your pulse, this would <i>not</i> count as accurate internal perception.</p><br /><br/> ",
    require_movement: false,
    slider_width: 400,
    data: {
        screen: "ias_questionnaire",
    },
}

var bhs_questionnaire = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: "I look forward to the future with hope and enthusiasm.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_1",
        },
        {
            prompt: "I might as well give up because I can't make things better for myself.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_2",
        },
        {
            prompt: "When things are going badly, I am helped by knowing they can't stay that way forever.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_3",
        },
        {
            prompt: "I can't imagine what my life would be like in 10 years.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_4",
        },
        {
            prompt: "I have enough time to accomplish the things I most want to do.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_5",
        },
        {
            prompt: "In the future, I expect to succeed in what concerns me most.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_6",
        },
        {
            prompt: "My future seems dark to me.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_7",
        },
        {
            prompt: "Please click the option FALSE",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "AttentionCheck_3",
        },
        {
            prompt: "I expect to get more of the good things in life than the average person.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_8",
        },
        {
            prompt: "I just don't get the breaks, and there's no reason to believe I will in the future.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_9",
        },
        {
            prompt: "My past experiences have prepared me well for my future.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_10",
        },
        {
            prompt: "All I can see ahead of me is unpleasantness rather than pleasantness.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_11",
        },
        {
            prompt: "I don't expect to get what I really want.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_12",
        },
        {
            prompt: "When I look ahead to the future, I expect I will be happier than I am now.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_13",
        },
        {
            prompt: "Things just won't work out the way I want them to.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_14",
        },
        {
            prompt: "I have great faith in the future.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_15",
        },
        {
            prompt: "I never get what I want so it's foolish to want anything.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_16",
        },
        {
            prompt: "It is very unlikely that I will get any real satisfaction in the future.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_17",
        },
        {
            prompt: "The future seems vague and uncertain to me",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_18",
        },
        {
            prompt: "I can look forward to more good times than bad times.",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_19",
        },
        {
            prompt: "There is no use in really trying to get something i want because i probably won't get it",
            options: ["TRUE", "FALSE"],
            required: true,
            name: "BHS_20",
        },
    ],
    preamble:
        "<p>Instructions for Completing this scale (20 questions): Please read each statement carefully and decide whether it describes how you have been feeling during the past week, including today. Indicate your response by selecting TRUE if the statement describes your feelings or FALSE if it does not. There are no right or wrong answers, so please respond as honestly as possible.</p>",
    scale_width: 400,
    button_label: "Next",
    randomize_question_order: true,
    randomize_choices: true,
    required: true,
    data: { screen: "bhs_questionnaire" },
}



var rrs_questionnaire_short = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: "Think what am i doing to deserve this?",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRSS_1",
        },
        {
            prompt: "Analyze recent events to try to understand why you are depressed",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRSS_2",
        },
        {
            prompt: "Think why do i always react this way?",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRSS_3",
        },
        {
            prompt: "Go away by yourself and think about why you feel this way",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRSS_4",
        },
        {
            prompt: "Write down what you are thinking and analyze it",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRSS_5",
        },
        {
            prompt: "Think about a recent situation, wishing it had gone better",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRSS_6",
        },
        {
            prompt: "Think why do i have problems other people don't have?",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRSS_7",
        },
        {
            prompt: "Think why can't i handle things better?",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRSS_8",
        },
        {
            prompt: "Analyze your personality to try to understand why you are depressed",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRSS_9",
        },
        {
            prompt: "Go someplace alone to think about your feelings",
            options: ["Almost never (1)", "Sometimes (2)", "Often (3)", "Almost always (4)"],
            required: true,
            name: "RRSS_10",
        },
    ],
    preamble: "<p>Please rate how frequently you respond in the following ways.</p>",
    button_label: "Next",
    required: true,
    data: { screen: "rrs_questionnaire_short" },
}



var awe_experience_questionnaire = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: "I sensed things momentarily slow down.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_1",
        },
        {
            prompt: "I noticed time slowing.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_2",
        },
        {
            prompt: "I felt my sense of time change.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_3",
        },
        {
            prompt: "I experienced the passage of time differently.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_4",
        },
        {
            prompt: "I had the sense that a moment lasted longer than usual.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_5",
        },
        {
            prompt: "I felt that my sense of self was diminished.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_6",
        },
        {
            prompt: "I felt my sense of self shrink.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_7",
        },
        {
            prompt: "I experienced a reduced sense of self.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_8",
        },
        {
            prompt: "I felt my sense of self become somehow smaller.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_9",
        },
        {
            prompt: "I felt small compared to everything else.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_10",
        },
        {
            prompt: "I had the sense of being connected to everything.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_11",
        },
        {
            prompt: "I felt a sense of communion with all living things.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_12",
        },
        {
            prompt: "I experienced a sense of oneness with all things.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_13",
        },
        {
            prompt: "I felt closely connected to humanity.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_14",
        },
        {
            prompt: "I had a sense of complete connectedness.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_15",
        },
        {
            prompt: "I felt that I was in the presence of something grand.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_16",
        },
        {
            prompt: "I experienced something greater than myself.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_17",
        },
        {
            prompt: "I felt in the presence of greatness.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_18",
        },
        {
            prompt: "I perceived something that was much larger than me.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_19",
        },
        {
            prompt: "Please click the option Neutral (4)",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AttentionCheck_4",
        },
        {
            prompt: "I perceived vastness.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_20",
        },
        {
            prompt: "I felt my jaw drop.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_21",
        },
        {
            prompt: "I had goosebumps.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_22",
        },
        {
            prompt: "I gasped.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_23",
        },
        {
            prompt: "I had chills.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_24",
        },
        {
            prompt: "I felt my eyes widen.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_25",
        },
        {
            prompt: "I felt challenged to mentally process what I was experiencing.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_26",
        },
        {
            prompt: "I found it hard to comprehend the experience in full.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_27",
        },
        {
            prompt: "I felt challenged to understand the experience.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_28",
        },
        {
            prompt: "I struggled to take in all that I was experiencing at once.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_29",
        },
        {
            prompt: "I tried to understand the magnitude of what I was experiencing.",
            options: [
                "Strongly Disagree (1)",
                "Moderately Disagree (2)",
                "Somewhat Disagree (3)",
                "Neutral (4)",
                "Somewhat Agree (5)",
                "Moderately Agree (6)",
                "Strongly Agree (7)",
            ],
            required: true,
            name: "AWE_30",
        },
    ],
    preamble:
        "<p>Please rate your experience during the videos. Instructions for Completing this scale: Please read each statement carefully and think about how it applies to your experience of the videos. Indicate how much you agree or disagree with each statement based on your experience. Use the following scale to rate your responses: 1: Strongly Disagree 2: Moderately Disagree 3:  Somewhat Disagree 4: Neutral 5: Somewhat Agree 6: Moderately Agree 7: Strongly Agree. Select the number that best reflects your level of agreement with each statement. There are no right or wrong answers, so please be as honest as possible.</p>",
    button_label: "Next",
    required: true,
    data: { screen: "awe_experience_questionnaire" },
}





var sts_questionnaire = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: "Having hobbies or interests I can enjoy",
            options: ["1=Not at all", "2=Very little", "3=Somewhat", "4=Very much"],
            required: true,
            name: "STS_1",
        },
        {
            prompt: "Accepting myself as I grow older.",
            options: ["1=Not at all", "2=Very little", "3=Somewhat", "4=Very much"],
            required: true,
            name: "STS_2",
        },
        {
            prompt: "Being involved with other people or my community when possible",
            options: ["1=Not at all", "2=Very little", "3=Somewhat", "4=Very much"],
            required: true,
            name: "STS_3",
        },
        {
            prompt: "Please click the option 3=Somewhat",
            options: ["1=Not at all", "2=Very little", "3=Somewhat", "4=Very much"],
            required: true,
            name: "AttentionCheck_5",
        },
        {
            prompt: "Adjusting well to my present life situation.",
            options: ["1=Not at all", "2=Very little", "3=Somewhat", "4=Very much"],
            required: true,
            name: "STS_4",
        },
        {
            prompt: "Adjusting to the changes in my physical ability.",
            options: ["1=Not at all", "2=Very little", "3=Somewhat", "4=Very much"],
            required: true,
            name: "STS_5",
        },
        {
            prompt: "Sharing my wisdom or experience with others.",
            options: ["1=Not at all", "2=Very little", "3=Somewhat", "4=Very much"],
            required: true,
            name: "STS_6",
        },
        {
            prompt: "Finding meaning in my past experiences.",
            options: ["1=Not at all", "2=Very little", "3=Somewhat", "4=Very much"],
            required: true,
            name: "STS_7",
        },
        {
            prompt: "Helping younger people or others in some way.",
            options: ["1=Not at all", "2=Very little", "3=Somewhat", "4=Very much"],
            required: true,
            name: "STS_8",
        },
        {
            prompt: "Having an interest in continuing to learn about things.",
            options: ["1=Not at all", "2=Very little", "3=Somewhat", "4=Very much"],
            required: true,
            name: "STS_9",
        },
        {
            prompt: "Putting aside some things that I once thought were so important.",
            options: ["1=Not at all", "2=Very little", "3=Somewhat", "4=Very much"],
            required: true,
            name: "STS_10",
        },
        {
            prompt: "Accepting death as a part of life.",
            options: ["1=Not at all", "2=Very little", "3=Somewhat", "4=Very much"],
            required: true,
            name: "STS_11",
        },
        {
            prompt: "Finding meaning in my spiritual beliefs.",
            options: ["1=Not at all", "2=Very little", "3=Somewhat", "4=Very much"],
            required: true,
            name: "STS_12",
        },
        {
            prompt: "Letting others help me when I may need it.",
            options: ["1=Not at all", "2=Very little", "3=Somewhat", "4=Very much"],
            required: true,
            name: "STS_13",
        },
        {
            prompt: "Enjoying my pace of life.",
            options: ["1=Not at all", "2=Very little", "3=Somewhat", "4=Very much"],
            required: true,
            name: "STS_14",
        },
        {
            prompt: "Dwelling on my past unmet dreams or goals.",
            options: ["1=Not at all", "2=Very little", "3=Somewhat", "4=Very much"],
            required: true,
            name: "STS_15",
        },
    ],
    preamble:
        "<p>Please read each statement carefully and consider how it applies to your experiences, thoughts and feelings. Indicate how much you agree or disagree with each statement based on your personal experiences. Use the following scale to rate your responses: 1: Not at all 2: Very little 3: Somewhat 4: Very much. Select the number that best reflects your level of agreement with each statement. There are no right or wrong answers, so please answer as honestly as possible.</p>",
    button_label: "Finish",
    required: true,
    data: { screen: "sts_questionnaire" },
}



