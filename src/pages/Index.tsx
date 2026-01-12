import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type Stage = 'intro' | 'character-select' | 'prosecution-select' | 'prosecution-present' | 'task1' | 'defense-select' | 'defense-present' | 'task2' | 'witnesses' | 'task3' | 'debate' | 'verdict';

type Role = 'prosecutor' | 'defender' | 'judge';

interface Argument {
  id: number;
  text: string;
  shortText: string;
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
  const [playerRole, setPlayerRole] = useState<Role | null>(null);
  const [selectedProsecutorArgs, setSelectedProsecutorArgs] = useState<number[]>([]);
  const [selectedDefenderArgs, setSelectedDefenderArgs] = useState<number[]>([]);
  const [currentPresentingArgIndex, setCurrentPresentingArgIndex] = useState(0);
  const [selectedWitness, setSelectedWitness] = useState<string | null>(null);
  const [taskAnswers, setTaskAnswers] = useState<{ [key: string]: boolean }>({});
  const [debateAnswer, setDebateAnswer] = useState<string>('');

  const characters: { [key: string]: Character } = {
    prosecutor: {
      name: 'Вредное Трение',
      role: 'Обвинение',
      image: 'https://cdn.poehali.dev/projects/dc3fb366-3615-4a31-a6b9-090b764de0a1/files/e6a346ec-4212-43a5-a166-eec911e78544.jpg',
      color: 'prosecutor',
      arguments: [
        { 
          id: 1, 
          shortText: 'Причина пожаров в механизмах',
          text: '🔥 Я вызываю пожары! Когда детали машин трутся друг о друга, выделяется огромное количество тепла. Это может привести к возгоранию!', 
          used: false 
        },
        { 
          id: 2, 
          shortText: 'Разрушение механизмов',
          text: '⚙️ Я разрушаю механизмы! Из-за меня стираются подшипники, шестерни и другие детали. Люди тратят миллионы на ремонт!', 
          used: false 
        },
        { 
          id: 3, 
          shortText: 'Потери энергии',
          text: '⚡ Я пожираю энергию! Около 20% топлива в автомобиле расходуется впустую только из-за меня. Это огромные потери!', 
          used: false 
        },
        { 
          id: 4, 
          shortText: 'Замедление прогресса',
          text: '💨 Я замедляю прогресс! Без меня все двигалось бы быстрее и эффективнее. Я - враг скорости и развития!', 
          used: false 
        },
      ]
    },
    defender: {
      name: 'Полезное Трение',
      role: 'Защита',
      image: 'https://cdn.poehali.dev/projects/dc3fb366-3615-4a31-a6b9-090b764de0a1/files/97010d93-666f-416c-ab06-482f40208acc.jpg',
      color: 'defender',
      arguments: [
        { 
          id: 1, 
          shortText: 'Возможность ходить',
          text: '👟 Без меня вы не смогли бы ходить! Каждый шаг - это благодаря трению между подошвой и землёй. Попробуйте пойти по льду - и поймёте мою важность!', 
          used: false 
        },
        { 
          id: 2, 
          shortText: 'Работа тормозов',
          text: '🚗 Я останавливаю машины! Тормоза работают только благодаря мне. Без трения автомобили не могли бы остановиться - представляете катастрофу?', 
          used: false 
        },
        { 
          id: 3, 
          shortText: 'Письмо и рисование',
          text: '✍️ Я помогаю писать и рисовать! Карандаш оставляет след на бумаге именно из-за трения. Без меня не было бы ни книг, ни рисунков!', 
          used: false 
        },
        { 
          id: 4, 
          shortText: 'Удержание предметов',
          text: '🔩 Я удерживаю всё на месте! Гвозди держатся в стене, узлы не развязываются, предметы не соскальзывают - всё это моя работа!', 
          used: false 
        },
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

  const debateQuestions = [
    {
      id: 'debate1',
      question: 'Обвинение заявляет: "Трение - главный враг прогресса!" Какой контраргумент выберет защита?',
      options: [
        { text: 'Без трения человечество не смогло бы построить цивилизацию - мы бы не могли ходить, держать инструменты и останавливать транспорт', correct: true },
        { text: 'Трение можно уменьшить смазкой', correct: false },
        { text: 'Прогресс важнее безопасности', correct: false }
      ]
    }
  ];

  const getProgressPercentage = () => {
    const stages: Stage[] = ['intro', 'prosecution-select', 'prosecution-present', 'task1', 'defense-select', 'defense-present', 'task2', 'witnesses', 'task3', 'debate', 'verdict'];
    return (stages.indexOf(stage) / (stages.length - 1)) * 100;
  };

  const handleProsecutorArgSelect = (argId: number) => {
    if (selectedProsecutorArgs.includes(argId)) {
      setSelectedProsecutorArgs(selectedProsecutorArgs.filter(id => id !== argId));
    } else if (selectedProsecutorArgs.length < 3) {
      setSelectedProsecutorArgs([...selectedProsecutorArgs, argId]);
    }
  };

  const handleDefenderArgSelect = (argId: number) => {
    if (selectedDefenderArgs.includes(argId)) {
      setSelectedDefenderArgs(selectedDefenderArgs.filter(id => id !== argId));
    } else if (selectedDefenderArgs.length < 3) {
      setSelectedDefenderArgs([...selectedDefenderArgs, argId]);
    }
  };

  const handleNextPresentingArg = (character: 'prosecutor' | 'defender') => {
    const selectedArgs = character === 'prosecutor' ? selectedProsecutorArgs : selectedDefenderArgs;
    
    if (currentPresentingArgIndex < selectedArgs.length - 1) {
      setCurrentPresentingArgIndex(currentPresentingArgIndex + 1);
    } else {
      if (character === 'prosecutor') {
        setStage('task1');
      } else {
        setStage('task2');
      }
      setCurrentPresentingArgIndex(0);
    }
  };

  const handleTaskAnswer = (taskId: string, correct: boolean) => {
    setTaskAnswers({ ...taskAnswers, [taskId]: correct });
    setTimeout(() => {
      if (taskId === 'task1') setStage('defense-select');
      else if (taskId === 'task2') setStage('witnesses');
      else if (taskId === 'task3') setStage('debate');
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
            <h3 className="text-xl font-semibold mb-3 text-amber-900">📋 Как проходит суд:</h3>
            <ul className="space-y-2 text-amber-800">
              <li className="flex items-start gap-2">
                <Icon name="Check" className="mt-1 flex-shrink-0 text-amber-600" size={20} />
                <span><strong>Обвинение:</strong> Выберите 3 сильнейших аргумента Вредного Трения</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" className="mt-1 flex-shrink-0 text-amber-600" size={20} />
                <span><strong>Защита:</strong> Выберите 3 контраргумента Полезного Трения</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" className="mt-1 flex-shrink-0 text-amber-600" size={20} />
                <span><strong>Свидетели:</strong> Послушайте показания экспертов</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" className="mt-1 flex-shrink-0 text-amber-600" size={20} />
                <span><strong>Дебаты:</strong> Выберите лучший контраргумент в финальном споре</span>
              </li>
            </ul>
          </div>
          <Button 
            onClick={() => setStage('character-select')} 
            size="lg" 
            className="w-full text-lg h-14 bg-judge hover:bg-judge/90 text-white"
          >
            Начать судебное заседание
            <Icon name="Gavel" className="ml-2" size={24} />
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderProsecutionSelect = () => {
    const prosecutor = characters.prosecutor;

    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="max-w-4xl mx-auto space-y-6">
          <Progress value={getProgressPercentage()} className="h-3" />
          
          <Card className="animate-fade-in shadow-xl border-prosecutor border-2">
            <CardHeader className="bg-prosecutor/10">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={prosecutor.image} 
                  alt={prosecutor.name} 
                  className="w-24 h-24 rounded-full border-4 border-prosecutor shadow-lg"
                />
                <div>
                  <Badge className="mb-2 bg-prosecutor text-white">{prosecutor.role}</Badge>
                  <CardTitle className="text-3xl text-prosecutor">{prosecutor.name}</CardTitle>
                </div>
              </div>
              <CardDescription className="text-lg">
                Выберите 3 самых убедительных аргумента обвинения ({selectedProsecutorArgs.length}/3)
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {prosecutor.arguments.map((arg) => (
                <Card 
                  key={arg.id}
                  className={`cursor-pointer transition-all hover:scale-[1.02] ${
                    selectedProsecutorArgs.includes(arg.id) 
                      ? 'ring-4 ring-prosecutor bg-red-50 border-prosecutor' 
                      : 'hover:border-prosecutor'
                  }`}
                  onClick={() => handleProsecutorArgSelect(arg.id)}
                >
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedProsecutorArgs.includes(arg.id) 
                        ? 'bg-prosecutor text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {selectedProsecutorArgs.includes(arg.id) ? (
                        <Icon name="Check" size={20} />
                      ) : (
                        <span>{arg.id}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg mb-1">{arg.shortText}</p>
                      <p className="text-sm text-muted-foreground">{arg.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button 
                onClick={() => {
                  setStage('prosecution-present');
                  setCurrentPresentingArgIndex(0);
                }}
                size="lg"
                className="w-full bg-prosecutor hover:bg-prosecutor/90 text-white mt-6"
                disabled={selectedProsecutorArgs.length !== 3}
              >
                Огласить обвинение в суде
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderProsecutionPresent = () => {
    const prosecutor = characters.prosecutor;
    const currentArgId = selectedProsecutorArgs[currentPresentingArgIndex];
    const currentArg = prosecutor.arguments.find(arg => arg.id === currentArgId);

    if (!currentArg) return null;

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
                  Аргумент {currentPresentingArgIndex + 1} из {selectedProsecutorArgs.length}
                </span>
                <Button 
                  onClick={() => handleNextPresentingArg('prosecutor')}
                  size="lg"
                  className="bg-prosecutor hover:bg-prosecutor/90 text-white"
                >
                  {currentPresentingArgIndex < selectedProsecutorArgs.length - 1 ? 'Следующий аргумент' : 'Перейти к заданию'}
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderDefenseSelect = () => {
    const defender = characters.defender;

    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-4xl mx-auto space-y-6">
          <Progress value={getProgressPercentage()} className="h-3" />
          
          <Card className="animate-fade-in shadow-xl border-defender border-2">
            <CardHeader className="bg-defender/10">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={defender.image} 
                  alt={defender.name} 
                  className="w-24 h-24 rounded-full border-4 border-defender shadow-lg"
                />
                <div>
                  <Badge className="mb-2 bg-defender text-white">{defender.role}</Badge>
                  <CardTitle className="text-3xl text-defender">{defender.name}</CardTitle>
                </div>
              </div>
              <CardDescription className="text-lg">
                Выберите 3 самых убедительных аргумента защиты ({selectedDefenderArgs.length}/3)
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {defender.arguments.map((arg) => (
                <Card 
                  key={arg.id}
                  className={`cursor-pointer transition-all hover:scale-[1.02] ${
                    selectedDefenderArgs.includes(arg.id) 
                      ? 'ring-4 ring-defender bg-green-50 border-defender' 
                      : 'hover:border-defender'
                  }`}
                  onClick={() => handleDefenderArgSelect(arg.id)}
                >
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedDefenderArgs.includes(arg.id) 
                        ? 'bg-defender text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {selectedDefenderArgs.includes(arg.id) ? (
                        <Icon name="Check" size={20} />
                      ) : (
                        <span>{arg.id}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg mb-1">{arg.shortText}</p>
                      <p className="text-sm text-muted-foreground">{arg.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button 
                onClick={() => {
                  setStage('defense-present');
                  setCurrentPresentingArgIndex(0);
                }}
                size="lg"
                className="w-full bg-defender hover:bg-defender/90 text-white mt-6"
                disabled={selectedDefenderArgs.length !== 3}
              >
                Представить защиту в суде
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderDefensePresent = () => {
    const defender = characters.defender;
    const currentArgId = selectedDefenderArgs[currentPresentingArgIndex];
    const currentArg = defender.arguments.find(arg => arg.id === currentArgId);

    if (!currentArg) return null;

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
                  Аргумент {currentPresentingArgIndex + 1} из {selectedDefenderArgs.length}
                </span>
                <Button 
                  onClick={() => handleNextPresentingArg('defender')}
                  size="lg"
                  className="bg-defender hover:bg-defender/90 text-white"
                >
                  {currentPresentingArgIndex < selectedDefenderArgs.length - 1 ? 'Следующий аргумент' : 'Перейти к заданию'}
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

  const renderDebate = () => {
    const debate = debateQuestions[0];
    const answered = debateAnswer !== '';

    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-orange-50 via-red-50 to-green-50">
        <div className="max-w-4xl mx-auto space-y-6">
          <Progress value={getProgressPercentage()} className="h-3" />
          
          <Card className="animate-scale-in shadow-xl border-4 border-judge">
            <CardHeader className="bg-judge/10">
              <div className="flex items-center justify-between mb-4">
                <img 
                  src={characters.prosecutor.image}
                  alt="Обвинение" 
                  className="w-20 h-20 rounded-full border-4 border-prosecutor shadow-lg"
                />
                <div className="text-4xl">⚔️</div>
                <img 
                  src={characters.defender.image}
                  alt="Защита" 
                  className="w-20 h-20 rounded-full border-4 border-defender shadow-lg"
                />
              </div>
              <CardTitle className="text-3xl text-center text-judge">Финальные дебаты</CardTitle>
              <CardDescription className="text-center text-lg mt-2">
                Выберите лучший контраргумент защиты
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="bg-red-50 border-2 border-prosecutor rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <Badge className="bg-prosecutor text-white">Обвинение</Badge>
                  <p className="text-lg font-semibold flex-1">{debate.question.split('"')[1]}</p>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-defender rounded-lg p-6">
                <Badge className="bg-defender text-white mb-4">Защита отвечает</Badge>
                <RadioGroup value={debateAnswer} onValueChange={setDebateAnswer}>
                  <div className="space-y-3">
                    {debate.options.map((option, index) => (
                      <div
                        key={index}
                        className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all ${
                          debateAnswer === option.text
                            ? option.correct
                              ? 'border-green-500 bg-green-100'
                              : 'border-red-500 bg-red-100'
                            : 'border-gray-200 hover:border-defender'
                        }`}
                      >
                        <RadioGroupItem value={option.text} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                          {option.text}
                        </Label>
                        {debateAnswer === option.text && option.correct && (
                          <Icon name="CheckCircle" className="text-green-600" size={24} />
                        )}
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {answered && (
                <Button 
                  onClick={() => setStage('verdict')}
                  size="lg"
                  className="w-full bg-judge hover:bg-judge/90 text-white"
                >
                  Услышать вердикт суда
                  <Icon name="Gavel" className="ml-2" size={24} />
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderCharacterSelect = () => (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-orange-50 to-blue-50">
      <Card className="max-w-5xl w-full animate-scale-in shadow-2xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-4xl font-bold text-judge mb-2">🎭 Выберите свою роль</CardTitle>
          <CardDescription className="text-xl">
            Каждая роль имеет свои задачи и влияет на ход судебного процесса
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card 
              className="cursor-pointer transition-all hover:scale-105 border-prosecutor border-2 hover:shadow-2xl"
              onClick={() => {
                setPlayerRole('prosecutor');
                setStage('prosecution-select');
              }}
            >
              <CardHeader className="text-center bg-prosecutor/10 pb-4">
                <div className="mb-4 flex justify-center">
                  <img 
                    src={characters.prosecutor.image}
                    alt="Обвинение" 
                    className="w-32 h-32 rounded-full border-4 border-prosecutor shadow-lg animate-bounce-subtle"
                  />
                </div>
                <CardTitle className="text-2xl text-prosecutor mb-2">Обвинение</CardTitle>
                <Badge className="bg-prosecutor text-white">Вредное Трение</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-center text-muted-foreground mb-4">
                  Докажите, что трение - главная проблема человечества
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Target" size={16} className="text-prosecutor" />
                    <span>Выберите 3 аргумента обвинения</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="MessageSquare" size={16} className="text-prosecutor" />
                    <span>Представьте их суду</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Swords" size={16} className="text-prosecutor" />
                    <span>Участвуйте в финальных дебатах</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer transition-all hover:scale-105 border-defender border-2 hover:shadow-2xl"
              onClick={() => {
                setPlayerRole('defender');
                setStage('prosecution-select');
              }}
            >
              <CardHeader className="text-center bg-defender/10 pb-4">
                <div className="mb-4 flex justify-center">
                  <img 
                    src={characters.defender.image}
                    alt="Защита" 
                    className="w-32 h-32 rounded-full border-4 border-defender shadow-lg animate-bounce-subtle"
                  />
                </div>
                <CardTitle className="text-2xl text-defender mb-2">Защита</CardTitle>
                <Badge className="bg-defender text-white">Полезное Трение</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-center text-muted-foreground mb-4">
                  Докажите, что без трения невозможна жизнь
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Shield" size={16} className="text-defender" />
                    <span>Выберите 3 аргумента защиты</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="MessageSquare" size={16} className="text-defender" />
                    <span>Опровергните обвинения</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Trophy" size={16} className="text-defender" />
                    <span>Победите в дебатах</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer transition-all hover:scale-105 border-judge border-2 hover:shadow-2xl"
              onClick={() => {
                setPlayerRole('judge');
                setStage('prosecution-select');
              }}
            >
              <CardHeader className="text-center bg-judge/10 pb-4">
                <div className="mb-4 flex justify-center">
                  <img 
                    src="https://cdn.poehali.dev/projects/dc3fb366-3615-4a31-a6b9-090b764de0a1/files/182cb691-45d9-4587-bbd5-bcea4e89d106.jpg"
                    alt="Судья" 
                    className="w-32 h-32 rounded-full border-4 border-judge shadow-lg animate-bounce-subtle"
                  />
                </div>
                <CardTitle className="text-2xl text-judge mb-2">Судья</CardTitle>
                <Badge className="bg-judge text-white">Беспристрастный</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-center text-muted-foreground mb-4">
                  Наблюдайте за процессом и выносите справедливый вердикт
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Scale" size={16} className="text-judge" />
                    <span>Следите за аргументами сторон</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="CheckSquare" size={16} className="text-judge" />
                    <span>Отвечайте на вопросы</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Gavel" size={16} className="text-judge" />
                    <span>Оцените обе стороны объективно</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Icon name="Info" className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <p className="font-semibold text-blue-900 mb-2">Подсказка:</p>
                <p className="text-blue-800">
                  Роль <strong>Судьи</strong> подходит для первого прохождения - вы увидите все аргументы обеих сторон. 
                  Роли <strong>Обвинения</strong> и <strong>Защиты</strong> позволяют активно участвовать в процессе и выбирать стратегию!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
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
                setPlayerRole(null);
                setSelectedProsecutorArgs([]);
                setSelectedDefenderArgs([]);
                setCurrentPresentingArgIndex(0);
                setSelectedWitness(null);
                setTaskAnswers({});
                setDebateAnswer('');
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
              className="flex-1 bg-judge hover:bg-judge/90 text-white"
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
      {stage === 'character-select' && renderCharacterSelect()}
      {stage === 'prosecution-select' && renderProsecutionSelect()}
      {stage === 'prosecution-present' && renderProsecutionPresent()}
      {stage === 'task1' && renderTask('task1')}
      {stage === 'defense-select' && renderDefenseSelect()}
      {stage === 'defense-present' && renderDefensePresent()}
      {stage === 'task2' && renderTask('task2')}
      {stage === 'witnesses' && renderWitnesses()}
      {stage === 'task3' && renderTask('task3')}
      {stage === 'debate' && renderDebate()}
      {stage === 'verdict' && renderVerdict()}
    </>
  );
};

export default Index;