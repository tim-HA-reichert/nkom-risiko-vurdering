import './App.css'
import QuestionsPage from "./pages/QuestionsPage.tsx";
import Button from "./components/ui/Button.tsx";
import {useState} from "react";
import ResultsPage from "./pages/ResultsPage.tsx";
import setOfQuestions from './data/questions.json'
import results from "./data/results.json"

const questionData = setOfQuestions.setOfQuestions;
const resultData = results.results;

type CheckBoxInfo = {
    checkId: number;
    riskLevel: number;
}

function App() {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [scoreHistory, setScoreHistory] = useState<Record<number, CheckBoxInfo>>({});

    //for på lagre radiobtn historikk
    const currentStepCheckId = scoreHistory[currentStep]?.checkId ?? null;

    //for å finne høyeste risiko nivå
    const riskLevels = Object.values(scoreHistory).map(a => a.riskLevel);
    const globalScore = riskLevels.length ? Math.max(...riskLevels) : null;

    const hasAnswer: boolean = currentStepCheckId != null;

    const singleAnswerSheet = questionData.filter(sheet =>
        sheet.step === currentStep
    );

    const getResultSheet = resultData.find(result =>
        result.riskLevel === globalScore
    );

    const prevQuestion = () => {
        const prevStep = currentStep - 1;
        setCurrentStep(prevStep);
    };
    const nextQuestion = () => {
        return setCurrentStep(currentStep + 1);
    };

    const resetTest = () => {
        setCurrentStep(1);
        setShowResults(false);
        setScoreHistory({});
    };

        if (showResults && getResultSheet) {
            return (
                <div className="flex flex-col gap-6">
                    <ResultsPage
                        title={getResultSheet.title}
                        pageContent={getResultSheet.content}
                    />
                    <Button
                        variant="outlined"
                        onClick={resetTest}
                        className="self-start"
                    >
                        Ta test på nytt
                    </Button>
                </div>
            );
        };


    return (
        <div className={'justify-center content-center max-w-xl flex-col flex gap-4'}>
            <div className="flex flex-col gap-4">
                <h1 className='text-4xl font-bold self-start tracking-tight'>Hvilket risikonivå er min KI-løsning?</h1>

                {singleAnswerSheet.map((item) => (
                    <QuestionsPage key={currentStep}
                                   title={item.question}
                                   radioGroup={item.id}
                                   list={item.list as []}
                                   selectedValue={currentStepCheckId}
                                   answerOption={item.answers}
                                   onSelect={(answer) => {
                                       setScoreHistory((prev) => ({
                                           ...prev,
                                           [currentStep]: {
                                               checkId: answer.checkId,
                                               riskLevel: answer.riskLevel,
                                           },
                                       }))
                                   }}
                    />
                ))}

            </div>

            <div className={'justify-between flex'}>
                {currentStep == 1 ? null : (
                    <Button variant={'outlined'} onClick={prevQuestion}>Tilbake</Button>
                )}
                {currentStep === 4 || globalScore === 4 ?
                    <Button className='ml-auto' variant={'primary'}
                            onClick={() => setShowResults(true)}>{currentStep === 4 ? 'Resultat' : 'Neste'}</Button>
                    : (
                        <Button
                            disabled={!hasAnswer}
                            className='ml-auto'
                            variant={hasAnswer ? 'primary' : 'disabled'}
                            onClick={
                                nextQuestion}>
                            Neste
                        </Button>
                    )}
            </div>
        </div>
    )
}

export default App
