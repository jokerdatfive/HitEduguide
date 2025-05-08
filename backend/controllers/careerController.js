import asyncHandler from 'express-async-handler';
import connectionDb from "../connect/database.js";
import axios from 'axios';

export const findProgram = asyncHandler(async (req, res) => {
    let db = await connectionDb();
    const { option1, option2, option3, grade1, grade2, grade3 } = req.body;
    const user_subjects = [
        { subject: option1, grade: grade1 },
        { subject: option2, grade: grade2 },
        { subject: option3, grade: grade3 }
    ];

    const matchPrograms = async (user_subjects) => {
        const document = await db.collection('careers').findOne({});
        if (document && document.programs) {
            const matched_programs = [];
            document.programs.forEach(program => {
                const matchCount = program.entry_requirements.filter(requirement =>
                    user_subjects.some(subject => subject.subject === requirement)
                ).length;
                if (matchCount >= 2) {
                    matched_programs.push(program.degree);
                }
            });

            const specificPrograms = [
                "BTech Honours Degree in Financial Engineering (HBFE)",
                "BTech Honours Degree in Chemical and Process Systems Engineering (HECP)",
                "BTech Honours Degree in Industrial and Manufacturing Engineering (HEIM)",
                "BTech Honours Degree in Materials Technology and Engineering (HEMT)",
                "BTech Honours Degree in Biomedical Engineering (HEBE)",
                "Bachelor of Science Honours Degree in Diagnostic Radiography (HADR)",
                "Bachelor of Science Honours Degree in Therapeutic Radiography (HATR)",
                "Bachelor of Pharmacy Honours degree (HSPT)",
                "BTech Honours Degree in Food Processing Technology (HSFP)"
            ];

            const passes = ["A", "B"];
            const threePasses = user_subjects.filter(subject => passes.includes(subject.grade)).length >= 3;

            specificPrograms.forEach(program => {
                if (matched_programs.includes(program) && !threePasses) {
                    const index = matched_programs.indexOf(program);
                    if (index > -1) {
                        matched_programs.splice(index, 1);
                    }
                }
            });

            return matched_programs;
        } else {
            res.status(404).json({ message: "No programs found." });
        }
    };

    const matchedPrograms = await matchPrograms(user_subjects);
    res.status(200).json({ programs: matchedPrograms });


});export const getCareers = asyncHandler(async (req, res) => {
    const { enterProgram } = req.body;

    const options = {
        method: 'POST',
        url: 'https://open-ai21.p.rapidapi.com/chatgpt',
        headers: {
            'x-rapidapi-key': 'c4e0c5fb15msh5f0a4f49492ff9ep101311jsn1c55f578fe70',
            'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            messages: [
                {
                    role: 'user',
                    content: `What are the potential career prospects for someone with a ${enterProgram}?`
                }
            ],
            web_access: false
        }
    };

    try {
        const response = await axios(options);
        const responseBody = response.data;
        console.log(responseBody);
       res.status(200).json({ message: responseBody.result.replace(/(.+?)(\r?\n|$)/g, '<li><b>$1</b></li>') });
    } catch (error){
        console.error("Error fetching career prospects:", error);
        res.status(500).json({ message: 'Error fetching career prospects' });
    }
});

