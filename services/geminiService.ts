import { GoogleGenAI, Type } from "@google/genai";
import type { Question, QuestionCategory } from '../types';
import { QuestionCategories } from '../types';


// IMPORTANT: This check is for development and may not work in all production environments.
// In a real-world scenario, ensure the API key is securely managed.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error("API_KEY is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const quizSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            questionText: {
                type: Type.STRING,
                description: "نص السؤال باللغة العربية",
            },
            options: {
                type: Type.ARRAY,
                items: {
                    type: Type.STRING
                },
                description: "مصفوفة من أربعة خيارات إجابة محتملة باللغة العربية",
            },
            correctAnswer: {
                type: Type.STRING,
                description: "الإجابة الصحيحة من ضمن الخيارات المتاحة",
            },
        },
        required: ["questionText", "options", "correctAnswer"],
    },
};

const getCategoryPrompt = (category: QuestionCategory): string => {
    switch (category) {
        case QuestionCategories.HISTORY_GEO:
            return "يجب أن تركز الأسئلة حصريًا على تاريخ المملكة العربية السعودية وجغرافيتها (المدن، الصحاري، البحار، المعالم التاريخية).";
        case QuestionCategories.CULTURE_ART:
            return "يجب أن تركز الأسئلة حصريًا على الثقافة والفنون السعودية (الأكل، الملابس، الاحتفالات، الفن، المهرجانات).";
        case QuestionCategories.GENERAL:
        default:
            return `يجب أن تغطي الأسئلة مواضيع متنوعة وممتعة مثل:
            - الثقافة السعودية (الأكل، الملابس التقليدية، الاحتفالات).
            - التاريخ البسيط للمملكة.
            - الجغرافيا (المدن الكبرى، الصحاري، البحار).
            - المعالم الشهيرة (مثل الكعبة المشرفة، برج المملكة، مدائن صالح).
            - الحيوانات والنباتات في السعودية.`;
    }
}

export const generateQuizQuestions = async (count: number = 10, category: QuestionCategory = QuestionCategories.GENERAL): Promise<Question[]> => {
    try {
        if (!API_KEY) {
            console.log("API_KEY not found, returning mock questions.");
            return getMockQuestions(count);
        }

        const categoryInstruction = getCategoryPrompt(category);

        const prompt = `
        أنشئ ${count} أسئلة بصيغة اختيار من متعدد للأطفال في المملكة العربية السعودية الذين تتراوح أعمارهم بين 9 و 12 عامًا. 
        ${categoryInstruction}
        
        يجب أن تكون جميع الأسئلة والإجابات والخيارات باللغة العربية الفصحى والمبسطة. 
        يجب أن يكون لكل سؤال أربعة خيارات، وإجابة واحدة صحيحة فقط.
        تأكد من أن الأسئلة مناسبة ومثيرة للاهتمام لهذه الفئة العمرية.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: quizSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const questions = JSON.parse(jsonText);

        if (!Array.isArray(questions) || questions.length === 0) {
            console.warn("API returned invalid data, falling back to mock data.");
            return getMockQuestions(count);
        }

        return questions as Question[];
    } catch (error) {
        console.error("Error generating quiz questions from API:", error);
        return getMockQuestions(count);
    }
};

const mockQuestions: Question[] = [
    {
        questionText: "ما هي عاصمة المملكة العربية السعودية؟",
        options: ["جدة", "الرياض", "الدمام", "مكة المكرمة"],
        correctAnswer: "الرياض",
    },
    {
        questionText: "أي من هذه الصحاري تقع بشكل رئيسي في المملكة العربية السعودية؟",
        options: ["صحراء كالاهاري", "صحراء غوبي", "الربع الخالي", "الصحراء الكبرى"],
        correctAnswer: "الربع الخالي",
    },
    {
        questionText: "ما هو الطبق الوطني الشهير في المملكة العربية السعودية؟",
        options: ["الكبسة", "البيتزا", "السوشي", "الباستا"],
        correctAnswer: "الكبسة",
    },
    {
        questionText: "ما هو البحر الذي يحد المملكة العربية السعودية من الغرب؟",
        options: ["البحر المتوسط", "البحر الأسود", "بحر العرب", "البحر الأحمر"],
        correctAnswer: "البحر الأحمر",
    },
    {
        questionText: "في أي مدينة تقع الكعبة المشرفة؟",
        options: ["المدينة المنورة", "الرياض", "مكة المكرمة", "الطائف"],
        correctAnswer: "مكة المكرمة",
    },
    {
        questionText: "ما اسم العملة الرسمية في المملكة العربية السعودية؟",
        options: ["الدينار", "الدرهم", "الريال", "الجنيه"],
        correctAnswer: "الريال",
    },
    {
        questionText: "أي برج من الأبراج التالية يقع في مدينة الرياض ويتميز بفتحة في أعلاه؟",
        options: ["برج الفيصلية", "برج خليفة", "أبراج البيت", "برج المملكة"],
        correctAnswer: "برج المملكة",
    },
    {
        questionText: "ما هو الزي التقليدي للرجال في المملكة العربية السعودية؟",
        options: ["البدلة", "الكيمونو", "الثوب والشماغ", "الساري"],
        correctAnswer: "الثوب والشماغ",
    },
    {
        questionText: "ما هو الحيوان الذي يشتهر بقدرته على تحمل العطش في صحاري السعودية؟",
        options: ["الحصان", "الجمل", "الفيل", "الأسد"],
        correctAnswer: "الجمل",
    },
    {
        questionText: "متى يتم الاحتفال باليوم الوطني السعودي؟",
        options: ["1 يناير", "4 يوليو", "23 سبتمبر", "25 ديسمبر"],
        correctAnswer: "23 سبتمبر",
    },
    {
        questionText: "أي مدينة سعودية تلقب بـ 'عروس البحر الأحمر'؟",
        options: ["الدمام", "جدة", "ينبع", "جازان"],
        correctAnswer: "جدة",
    },
    {
        questionText: "ما هي أكبر مدن المملكة العربية السعودية من حيث عدد السكان؟",
        options: ["مكة المكرمة", "جدة", "الدمام", "الرياض"],
        correctAnswer: "الرياض",
    },
    {
        questionText: "ما هو المهرجان الوطني للتراث والثقافة الذي يقام سنوياً في الرياض؟",
        options: ["مهرجان ورد الطائف", "مهرجان الجنادرية", "سوق عكاظ", "موسم الرياض"],
        correctAnswer: "مهرجان الجنادرية",
    },
    {
        questionText: "أي من المواقع التالية مدرج ضمن قائمة اليونسكو للتراث العالمي؟",
        options: ["شاطئ نصف القمر", "مدائن صالح (الحِجر)", "جبل طويق", "وادي حنيفة"],
        correctAnswer: "مدائن صالح (الحِجر)",
    },
    {
        questionText: "ما هو نوع التمور الشهير الذي تشتهر به منطقة القصيم؟",
        options: ["البرحي", "الصقعي", "السكري", "الخلاص"],
        correctAnswer: "السكري",
    },
];


const getMockQuestions = (count: number): Question[] => {
    // Shuffling mock questions to provide some variety
    const shuffled = [...mockQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};