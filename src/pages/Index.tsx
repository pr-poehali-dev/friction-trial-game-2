import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

type Stage = 'intro' | 'prosecution' | 'task1' | 'defense' | 'task2' | 'witnesses' | 'task3' | 'verdict';

interface Argument {
  id: number;
  text: string;
  used: boolean;
}

interface Character {
  name: string;
  role: string;
  image: string;
  color: string;
  arguments: Argument[];
}

const Index = () => {
  const [stage, setStage] = useState<Stage>('intro');
  const [currentArgumentIndex, setCurrentArgumentIndex] = useState(0);
  const [selectedWitness, setSelectedWitness] = useState<string | null>(null);
  const [taskAnswers, setTaskAnswers] = useState<{ [key: string]: boolean }>({});

  const characters: { [key: string]: Character } = {
    prosecutor: {
      name: 'Вредное Трение',
      role: 'Обвинение',
      image: 'https://cdn.poehali.dev/projects/dc3fb366-3615-4a31-a6b9-090b764de0a1/files/e6a346ec-4212-43a5-a166-eec911e78544.jpg',
      color: 'prosecutor',
      arguments: [
        { id: 1, text: '🔥 Я вызываю пожары! Когда детали машин трутся друг о друга, выделяется огромное количество тепла. Это может привести к возгоранию!', used: false },
        { id: 2, text: '⚙️ Я разрушаю механизмы! Из-за меня стираются подшипники, шестерни и другие детали. Люди тратят миллионы на ремонт!', used: false },
        { id: 3, text: '⚡ Я пожираю энергию! Около 20% топлива в автомобиле расходуется впустую только из-за меня. Это огромные потери!', used: false },
        { id: 4, text: '💨 Я замедляю прогресс! Без меня все двигалось бы быстрее и эффективнее. Я - враг скорости и развития!', used: false },
      ]
    },
    defender: {
      name: 'Полезное Трение',
      role: 'Защита',
      image: 'https://cdn.poehali.dev/projects/dc3fb366-3615-4a31-a6b9-090b764de0a1/files/97010d93-666f-416c-ab06-482f40208acc.jpg',
      color: 'defender',
      arguments: [
        { id: 1, text: '👟 Без меня вы не смогли бы ходить! Каждый шаг - это благодаря трению между подошвой и землёй. Попробуйте пойти по льду - и поймёте мою важность!', used: false },
        { id: 2, text: '🚗 Я останавливаю машины! Тормоза работают только благодаря мне. Без трения автомобили не могли бы остановиться - представляете катастрофу?', used: false },
        { id: 3, text: '✍️ Я помогаю писать и рисовать! Карандаш оставляет след на бумаге именно из-за трения. Без меня не было бы ни книг, ни рисунков!', used: false },
        { id: 4, text: '🔩 Я удерживаю всё на месте! Гвозди держатся в стене, узлы не развязываются, предметы не соскальзывают - всё это моя работа!', used: false },
      ]
    }
  };

  const witnesses = [
    {
      name: 'Шипы на шинах',
      icon: '❄️',
      testimony: 'Я увеличиваю трение на скользкой дороге! Благодаря мне автомобили не скользят по льду и снегу. Трение спасает жизни зимой!',
      color: 'bg-blue-100 border-blue-300 text-blue-900'
    },
    {
      name: 'Смазка',
      icon: '💧',
      testimony: 'Я уменьшаю вредное трение в механизмах! Покрываю детали тонкой плёнкой, чтобы они не изнашивались. Но не убираю трение полностью - оно всё равно нужно!',
      color: 'bg-amber-100 border-amber-300 text-amber-900'
    },
    {
      name: 'Подшипники',
      icon: '⚙️',
      testimony: 'Я превращаю трение скольжения в трение качения! Это уменьшает износ и потери энергии в 10-100 раз. Но трение всё равно остаётся необходимым!',
      color: 'bg-gray-100 border-gray-300 text-gray-900'
    }
  ];

  const tasks = {
    task1: {
      question: 'Что произойдёт, если трение полностью исчезнет?',
      options: [
        { text: 'Все предметы начнут скользить, невозможно будет ходить', correct: true },
        { text: 'Станет легче двигать тяжёлые предметы', correct: false },
        { text: 'Машины поедут быстрее', correct: false }
      ]
    },
    task2: {
      question: 'Как можно уменьшить вредное трение в механизмах?',
      options: [
        { text: 'Использовать смазку и подшипники', correct: true },
        { text: 'Увеличить шероховатость поверхностей', correct: false },
        { text: 'Убрать все колёса', correct: false }
      ]
    },
    task3: {
      question: 'Где трение приносит больше пользы, чем вреда?',
      options: [
        { text: 'В тормозах автомобиля', correct: true },
        { text: 'В двигателе без смазки', correct: false },
        { text: 'На коньках на льду', correct: false }
      ]
    }
  };

  const getProgressPercentage = () => {
    const stages: Stage[] = ['intro', 'prosecution', 'task1', 'defense', 'task2', 'witnesses', 'task3', 'verdict'];
    return (stages.indexOf(stage) / (stages.length - 1)) * 100;
  };

  const handleNextArgument = (character: 'prosecutor' | 'defender') => {
    const char = characters[character];
    if (currentArgumentIndex < char.arguments.length - 1) {
      setCurrentArgumentIndex(currentArgumentIndex + 1);
    } else {
      if (character === 'prosecutor') {
        setStage('task1');
      } else {
        setStage('task2');
      }
      setCurrentArgumentIndex(0);
    }
  };

  const handleTaskAnswer = (taskId: string, correct: boolean) => {
    setTaskAnswers({ ...taskAnswers, [taskId]: correct });
    setTimeout(() => {
      if (taskId === 'task1') setStage('defense');
      else if (taskId === 'task2') setStage('witnesses');
      else if (taskId === 'task3') setStage('verdict');
    }, 1500);
  };

  const renderIntro = () => (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-orange-50 to-blue-50">
      <Card className="max-w-2xl w-full animate-scale-in shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="mb-4 flex justify-center">
            <img 
              src="https://cdn.poehali.dev/projects/dc3fb366-3615-4a31-a6b9-090b764de0a1/files/182cb691-45d9-4587-bbd5-bcea4e89d106.jpg" 
              alt="Судья" 
              className="w-32 h-32 rounded-full border-4 border-judge shadow-lg"
            />
          </div>
          <CardTitle className="text-4xl font-bold text-judge mb-2">⚖️ Суд над Силой Трения</CardTitle>
          <p className="text-xl text-muted-foreground">Образовательная ролевая игра по физике</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-amber-900">📋 О судебном процессе:</h3>
            <ul className="space-y-2 text-amber-800">
              <li className="flex items-start gap-2">
                <Icon name="Check" className="mt-1 flex-shrink-0 text-amber-600" size={20} />
                <span><strong>Обвинение:</strong> Вредное трение представит свои аргументы о вреде трения</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" className="mt-1 flex-shrink-0 text-amber-600" size={20} />
                <span><strong>Защита:</strong> Полезное трение докажет свою важность</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" className="mt-1 flex-shrink-0 text-amber-600" size={20} />
                <span><strong>Свидетели:</strong> Шипы, смазка и подшипники дадут показания</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" className="mt-1 flex-shrink-0 text-amber-600" size={20} />
                <span><strong>Задания:</strong> Вам нужно будет ответить на вопросы между этапами</span>
              </li>
            </ul>
          </div>
          <Button 
            onClick={() => setStage('prosecution')} 
            size="lg" 
            className="w-full text-lg h-14 bg-judge hover:bg-judge/90"
          >
            Начать судебное заседание
            <Icon name="Gavel" className="ml-2" size={24} />
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderProsecution = () => {
    const prosecutor = characters.prosecutor;
    const currentArg = prosecutor.arguments[currentArgumentIndex];

    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="max-w-4xl mx-auto space-y-6">
          <Progress value={getProgressPercentage()} className="h-3" />
          
          <Card className="animate-fade-in shadow-xl border-prosecutor border-2">
            <CardHeader className="bg-prosecutor/10">
              <div className="flex items-center gap-4">
                <img 
                  src={prosecutor.image} 
                  alt={prosecutor.name} 
                  className="w-24 h-24 rounded-full border-4 border-prosecutor shadow-lg animate-bounce-subtle"
                />
                <div>
                  <Badge className="mb-2 bg-prosecutor text-white">{prosecutor.role}</Badge>
                  <CardTitle className="text-3xl text-prosecutor">{prosecutor.name}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-red-50 border-l-4 border-prosecutor p-6 rounded-r-lg mb-6 animate-slide-in-left">
                <p className="text-lg leading-relaxed">{currentArg.text}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Аргумент {currentArgumentIndex + 1} из {prosecutor.arguments.length}
                </span>
                <Button 
                  onClick={() => handleNextArgument('prosecutor')}
                  size="lg"
                  className="bg-prosecutor hover:bg-prosecutor/90"
                >
                  {currentArgumentIndex < prosecutor.arguments.length - 1 ? 'Следующий аргумент' : 'Перейти к заданию'}
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderDefense = () => {
    const defender = characters.defender;
    const currentArg = defender.arguments[currentArgumentIndex];

    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-4xl mx-auto space-y-6">
          <Progress value={getProgressPercentage()} className="h-3" />
          
          <Card className="animate-fade-in shadow-xl border-defender border-2">
            <CardHeader className="bg-defender/10">
              <div className="flex items-center gap-4">
                <img 
                  src={defender.image} 
                  alt={defender.name} 
                  className="w-24 h-24 rounded-full border-4 border-defender shadow-lg animate-bounce-subtle"
                />
                <div>
                  <Badge className="mb-2 bg-defender text-white">{defender.role}</Badge>
                  <CardTitle className="text-3xl text-defender">{defender.name}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-green-50 border-l-4 border-defender p-6 rounded-r-lg mb-6 animate-slide-in-right">
                <p className="text-lg leading-relaxed">{currentArg.text}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Аргумент {currentArgumentIndex + 1} из {defender.arguments.length}
                </span>
                <Button 
                  onClick={() => handleNextArgument('defender')}
                  size="lg"
                  className="bg-defender hover:bg-defender/90"
                >
                  {currentArgumentIndex < defender.arguments.length - 1 ? 'Следующий аргумент' : 'Перейти к заданию'}
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderTask = (taskId: 'task1' | 'task2' | 'task3') => {
    const task = tasks[taskId];
    const answered = taskAnswers[taskId] !== undefined;

    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="max-w-3xl mx-auto space-y-6">
          <Progress value={getProgressPercentage()} className="h-3" />
          
          <Card className="animate-scale-in shadow-xl">
            <CardHeader className="bg-primary/10">
              <CardTitle className="text-2xl flex items-center gap-3">
                <Icon name="HelpCircle" size={32} className="text-primary" />
                Интерактивное задание
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <p className="text-xl font-semibold mb-6">{task.question}</p>
                <div className="space-y-3">
                  {task.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => !answered && handleTaskAnswer(taskId, option.correct)}
                      variant={
                        answered
                          ? option.correct
                            ? 'default'
                            : 'outline'
                          : 'outline'
                      }
                      className={`w-full text-left h-auto py-4 px-6 justify-start text-base ${
                        answered && option.correct
                          ? 'bg-green-500 hover:bg-green-600 text-white border-green-600'
                          : answered && !option.correct && taskAnswers[taskId] === option.correct
                          ? 'bg-red-100 border-red-300'
                          : ''
                      }`}
                      disabled={answered}
                    >
                      <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                      {option.text}
                      {answered && option.correct && (
                        <Icon name="CheckCircle" className="ml-auto" size={24} />
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              {answered && taskAnswers[taskId] && (
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 animate-fade-in">
                  <p className="text-green-800 font-semibold flex items-center gap-2">
                    <Icon name="CheckCircle" size={24} />
                    Правильно! Переход к следующему этапу...
                  </p>
                </div>
              )}

              {answered && !taskAnswers[taskId] && (
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 animate-fade-in">
                  <p className="text-red-800 font-semibold flex items-center gap-2">
                    <Icon name="XCircle" size={24} />
                    Неправильно. Подумайте ещё раз!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderWitnesses = () => (
    <div className="min-h-screen p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-5xl mx-auto space-y-6">
        <Progress value={getProgressPercentage()} className="h-3" />
        
        <Card className="animate-fade-in shadow-xl">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-3xl flex items-center gap-3">
              <Icon name="Users" size={36} className="text-primary" />
              Показания свидетелей
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {witnesses.map((witness, index) => (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedWitness === witness.name ? 'ring-4 ring-primary' : ''
                  } ${witness.color} border-2 animate-scale-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedWitness(witness.name)}
                >
                  <CardHeader className="text-center pb-3">
                    <div className="text-6xl mb-2">{witness.icon}</div>
                    <CardTitle className="text-lg">{witness.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedWitness === witness.name && (
                      <div className="animate-fade-in">
                        <p className="text-sm leading-relaxed">{witness.testimony}</p>
                      </div>
                    )}
                    {!selectedWitness && (
                      <p className="text-xs text-center text-muted-foreground">Нажмите для показаний</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedWitness && (
              <div className="mt-8 text-center animate-fade-in">
                <Button 
                  onClick={() => setStage('task3')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  Перейти к финальному заданию
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderVerdict = () => (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
      <Card className="max-w-3xl w-full animate-scale-in shadow-2xl">
        <CardHeader className="text-center pb-4 bg-judge/10">
          <div className="mb-4 flex justify-center">
            <img 
              src="https://cdn.poehali.dev/projects/dc3fb366-3615-4a31-a6b9-090b764de0a1/files/182cb691-45d9-4587-bbd5-bcea4e89d106.jpg" 
              alt="Судья" 
              className="w-32 h-32 rounded-full border-4 border-judge shadow-lg"
            />
          </div>
          <CardTitle className="text-4xl font-bold text-judge mb-2">⚖️ Вердикт суда</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="bg-amber-50 border-l-4 border-judge p-6 rounded-r-lg">
            <h3 className="text-2xl font-bold mb-4 text-judge">Судья объявляет:</h3>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                <strong>Суд установил:</strong> Сила трения имеет две стороны - она может быть как вредной, так и полезной!
              </p>
              
              <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4">
                <p className="font-semibold text-red-900 mb-2">❌ Вредное трение:</p>
                <ul className="list-disc list-inside space-y-1 text-red-800">
                  <li>Изнашивает механизмы</li>
                  <li>Выделяет избыточное тепло</li>
                  <li>Требует дополнительной энергии</li>
                </ul>
              </div>

              <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-2">✅ Полезное трение:</p>
                <ul className="list-disc list-inside space-y-1 text-green-800">
                  <li>Позволяет ходить и двигаться</li>
                  <li>Обеспечивает работу тормозов</li>
                  <li>Удерживает предметы на месте</li>
                  <li>Необходимо для письма и рисования</li>
                </ul>
              </div>

              <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4">
                <p className="font-semibold text-blue-900 mb-2">🔧 Решение:</p>
                <p className="text-blue-800">
                  Человечество научилось управлять трением: уменьшать его там, где оно вредно (смазка, подшипники), 
                  и усиливать там, где оно полезно (шипы, протекторы, тормоза).
                </p>
              </div>

              <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4 mt-6">
                <p className="font-bold text-purple-900 text-xl text-center">
                  🎓 Вывод: Трение - не враг и не друг, а важное физическое явление, 
                  которое нужно понимать и правильно использовать!
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={() => {
                setStage('intro');
                setCurrentArgumentIndex(0);
                setSelectedWitness(null);
                setTaskAnswers({});
              }}
              size="lg"
              variant="outline"
              className="flex-1"
            >
              <Icon name="RotateCcw" className="mr-2" size={20} />
              Начать заново
            </Button>
            <Button 
              onClick={() => window.location.reload()}
              size="lg"
              className="flex-1 bg-judge hover:bg-judge/90"
            >
              Завершить игру
              <Icon name="CheckCircle" className="ml-2" size={20} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      {stage === 'intro' && renderIntro()}
      {stage === 'prosecution' && renderProsecution()}
      {stage === 'task1' && renderTask('task1')}
      {stage === 'defense' && renderDefense()}
      {stage === 'task2' && renderTask('task2')}
      {stage === 'witnesses' && renderWitnesses()}
      {stage === 'task3' && renderTask('task3')}
      {stage === 'verdict' && renderVerdict()}
    </>
  );
};

export default Index;
