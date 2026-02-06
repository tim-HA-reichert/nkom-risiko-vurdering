import RadioOption from "../components/ui/RadioButton.tsx";

interface AnswerDataProps {
    id: string;
    label: string;
    riskLevel: number;
    checkId: number;
}

interface QuestionPageProps {
    title: string;
    radioGroup: string;
    list: string[] | null;
    selectedValue: number | null;
    answerOption: AnswerDataProps[];
    onSelect: (answer: AnswerDataProps) => void;
}

export default function QuestionsPage({list, selectedValue, title, radioGroup, onSelect, answerOption}: Readonly<QuestionPageProps>) {

    return (
        <div className="min-h-full flex flex-col gap-1 ">
            <h2 className='text-xl font-bold self-start'>{title}</h2>
            <div className='flex-col flex text-start gap-3'>
                {list ?
                    list.map((item, i) => {
                        return <li key={i}>
                            <ul>
                                {item}
                            </ul>
                        </li>
                    }) : null
                }

                {answerOption.map((answer, index) => (
                    <RadioOption
                        key={index}

                        label={answer.label}
                        id={answer.id}
                        value={answer.riskLevel}
                        checked={selectedValue === answer.checkId}
                        buttonGroupName={radioGroup}
                        onChange={() => onSelect(answer)}
                    />
                ))
                }
            </div>
        </div>
    )
}