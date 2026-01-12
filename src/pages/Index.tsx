import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

type Stage = 'intro' | 'character-select' | 'court-session' | 'verdict';

type Role = 'prosecutor' | 'defender' | 'judge';

interface DialogMessage {
  speaker: 'judge' | 'prosecutor' | 'defender' | 'witness';
  name: string;
  text: string;
  emotion?: 'angry' | 'calm' | 'worried' | 'confident';
}

const Index = () => {
  const [stage, setStage] = useState<Stage>('intro');
  const [playerRole, setPlayerRole] = useState<Role | null>(null);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [taskAnswers, setTaskAnswers] = useState<{ [key: string]: boolean }>({});

  const characters = {
    prosecutor: {
      name: 'Вредное Трение',
      role: 'Обвинение',
      image: 'https://cdn.poehali.dev/projects/dc3fb366-3615-4a31-a6b9-090b764de0a1/files/e6a346ec-4212-43a5-a166-eec911e78544.jpg',
      color: 'prosecutor'
    },
    defender: {
      name: 'Полезное Трение',
      role: 'Защита',
      image: 'https://cdn.poehali.dev/projects/dc3fb366-3615-4a31-a6b9-090b764de0a1/files/97010d93-666f-416c-ab06-482f40208acc.jpg',
      color: 'defender'
    },
    judge: {
      name: 'Судья',
      role: 'Председательствующий',
      image: 'https://cdn.poehali.dev/projects/dc3fb366-3615-4a31-a6b9-090b764de0a1/files/182cb691-45d9-4587-bbd5-bcea4e89d106.jpg',
      color: 'judge'
    }
  };

  const courtDialog: DialogMessage[] = [
    {
      speaker: 'judge',
      name: 'Судья',
      text: '⚖️ Заседание суда объявляется открытым! Сегодня мы рассматриваем дело о Силе Трения. Прошу соблюдать порядок!'
    },
    {
      speaker: 'judge',
      name: 'Судья',
      text: 'Слово предоставляется обвинению. Какие претензии вы предъявляете Силе Трения?'
    },
    {
      speaker: 'prosecutor',
      name: 'Вредное Трение',
      text: '🔥 Ваша честь! Я обвиняю трение в том, что оно вызывает пожары! Когда детали машин трутся друг о друга, выделяется огромное количество тепла!',
      emotion: 'angry'
    },
    {
      speaker: 'defender',
      name: 'Полезное Трение',
      text: '❗ Возражаю! Это неполная картина! Инженеры давно решили эту проблему с помощью смазки и охлаждения!',
      emotion: 'confident'
    },
    {
      speaker: 'prosecutor',
      name: 'Вредное Трение',
      text: '⚙️ А разрушение механизмов?! Из-за меня стираются подшипники, шестерни! Люди тратят МИЛЛИОНЫ на ремонт!',
      emotion: 'angry'
    },
    {
      speaker: 'judge',
      name: 'Судья',
      text: '🔨 Прошу без эмоций! Защита, у вас есть контраргумент?'
    },
    {
      speaker: 'defender',
      name: 'Полезное Трение',
      text: '👟 Конечно! Без меня никто не смог бы даже ХОДИТЬ! Каждый шаг - это благодаря трению между подошвой и землёй!',
      emotion: 'confident'
    },
    {
      speaker: 'prosecutor',
      name: 'Вредное Трение',
      text: '💨 Это лишь оправдание! Без меня всё двигалось бы быстрее и эффективнее! Я враг прогресса!',
      emotion: 'angry'
    },
    {
      speaker: 'defender',
      name: 'Полезное Трение',
      text: '🚗 Быстрее?! А КАК ВЫ ОСТАНОВИТЕСЬ?! Тормоза работают ТОЛЬКО благодаря трению! Без меня - катастрофа!',
      emotion: 'angry'
    },
    {
      speaker: 'judge',
      name: 'Судья',
      text: '⚠️ Прекратите перебивать друг друга! Суд вызывает свидетелей!'
    },
    {
      speaker: 'witness',
      name: 'Смазка',
      text: '💧 Я свидетель того, что трение можно контролировать! Я уменьшаю вредное трение в механизмах, покрывая детали тонкой плёнкой.'
    },
    {
      speaker: 'prosecutor',
      name: 'Вредное Трение',
      text: '😤 Значит вы ПРИЗНАЁТЕ, что я вредное! Иначе зачем нужна смазка?!',
      emotion: 'confident'
    },
    {
      speaker: 'defender',
      name: 'Полезное Трение',
      text: '🎯 Но смазка НЕ УБИРАЕТ трение полностью! Оно остаётся там, где НЕОБХОДИМО - в тормозах, в обуви, в письме!',
      emotion: 'confident'
    },
    {
      speaker: 'witness',
      name: 'Подшипники',
      text: '⚙️ Я превращаю трение скольжения в трение качения! Это уменьшает износ в 10-100 раз, но трение всё равно нужно!'
    },
    {
      speaker: 'witness',
      name: 'Шипы на шинах',
      text: '❄️ А я УВЕЛИЧИВАЮ трение на льду! Благодаря мне автомобили не скользят зимой. Трение спасает жизни!'
    },
    {
      speaker: 'prosecutor',
      name: 'Вредное Трение',
      text: '⚡ Но факт остаётся фактом - 20% топлива расходуется впустую из-за меня! Это огромные потери энергии!',
      emotion: 'confident'
    },
    {
      speaker: 'defender',
      name: 'Полезное Трение',
      text: '✍️ А без меня не было бы ни книг, ни рисунков! Карандаш оставляет след ТОЛЬКО благодаря трению! Искусство существует благодаря мне!',
      emotion: 'confident'
    },
    {
      speaker: 'prosecutor',
      name: 'Вредное Трение',
      text: '🔥 Вы просто пытаетесь оправдать разрушение! Я - главная проблема техники!',
      emotion: 'angry'
    },
    {
      speaker: 'defender',
      name: 'Полезное Трение',
      text: '🔩 А вы забываете, что я удерживаю всё на месте! Гвозди в стене, узлы на верёвках, предметы в руках - это МОЯ заслуга!',
      emotion: 'angry'
    },
    {
      speaker: 'judge',
      name: 'Судья',
      text: '🔨 ТИШИНА В ЗАЛЕ! Суд удаляется на совещание для вынесения вердикта!'
    }
  ];

  const courtQuestions = [
    {
      index: 9,
      question: 'Как вы думаете, кто прав в этом споре?',
      options: [
        { text: 'Обвинение - трение действительно вредно', correct: false },
        { text: 'Защита - трение необходимо для жизни', correct: false },
        { text: 'Обе стороны правы - трение имеет две стороны', correct: true }
      ]
    },
    {
      index: 14,
      question: 'Что доказывают показания свидетелей?',
      options: [
        { text: 'Трение можно только уменьшать', correct: false },
        { text: 'Трением можно управлять - уменьшать или увеличивать', correct: true },
        { text: 'Трение всегда вредно', correct: false }
      ]
    },
    {
      index: 19,
      question: 'Какой вывод можно сделать из этого суда?',
      options: [
        { text: 'Нужно полностью избавиться от трения', correct: false },
        { text: 'Трение - враг человечества', correct: false },
        { text: 'Нужно научиться управлять трением правильно', correct: true }
      ]
    }
  ];

  const getProgressPercentage = () => {
    if (stage === 'court-session') {
      return (dialogIndex / courtDialog.length) * 100;
    }
    return 0;
  };

  const getCurrentQuestion = () => {
    return courtQuestions.find(q => q.index === dialogIndex);
  };

  const handleAnswer = (correct: boolean) => {
    setTaskAnswers({ ...taskAnswers, [dialogIndex]: correct });
    setTimeout(() => {
      setDialogIndex(dialogIndex + 1);
    }, 1500);
  };

  const handleNextDialog = () => {
    if (dialogIndex < courtDialog.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else {
      setStage('verdict');
    }
  };

  const getSpeakerColor = (speaker: string) => {
    switch (speaker) {
      case 'judge': return 'judge';
      case 'prosecutor': return 'prosecutor';
      case 'defender': return 'defender';
      case 'witness': return 'primary';
      default: return 'muted';
    }
  };

  const getSpeakerImage = (speaker: string) => {
    if (speaker === 'judge') return characters.judge.image;
    if (speaker === 'prosecutor') return characters.prosecutor.image;
    if (speaker === 'defender') return characters.defender.image;
    return null;
  };

  const renderIntro = () => (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-orange-50 to-blue-50">
      <Card className="max-w-2xl w-full animate-scale-in shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="mb-4 flex justify-center">
            <img 
              src={characters.judge.image}
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
                <span><strong>Живые диалоги:</strong> Наблюдайте за горячими спорами между обвинением и защитой</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" className="mt-1 flex-shrink-0 text-amber-600" size={20} />
                <span><strong>Выбор роли:</strong> Станьте обвинителем, защитником или судьёй</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" className="mt-1 flex-shrink-0 text-amber-600" size={20} />
                <span><strong>Вопросы:</strong> Отвечайте на вопросы по ходу судебного процесса</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" className="mt-1 flex-shrink-0 text-amber-600" size={20} />
                <span><strong>Вердикт:</strong> Узнайте истину о силе трения!</span>
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

  const renderCharacterSelect = () => (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-orange-50 to-blue-50">
      <Card className="max-w-5xl w-full animate-scale-in shadow-2xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-4xl font-bold text-judge mb-2">🎭 Выберите свою роль</CardTitle>
          <CardDescription className="text-xl">
            Каждая роль позволяет по-своему участвовать в судебном процессе
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card 
              className="cursor-pointer transition-all hover:scale-105 border-prosecutor border-2 hover:shadow-2xl"
              onClick={() => {
                setPlayerRole('prosecutor');
                setStage('court-session');
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
                    <Icon name="Flame" size={16} className="text-prosecutor" />
                    <span>Атакуйте защиту мощными аргументами</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Target" size={16} className="text-prosecutor" />
                    <span>Указывайте на вред трения</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer transition-all hover:scale-105 border-defender border-2 hover:shadow-2xl"
              onClick={() => {
                setPlayerRole('defender');
                setStage('court-session');
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
                    <span>Защищайте важность трения</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Heart" size={16} className="text-defender" />
                    <span>Покажите пользу трения</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer transition-all hover:scale-105 border-judge border-2 hover:shadow-2xl"
              onClick={() => {
                setPlayerRole('judge');
                setStage('court-session');
              }}
            >
              <CardHeader className="text-center bg-judge/10 pb-4">
                <div className="mb-4 flex justify-center">
                  <img 
                    src={characters.judge.image}
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
                    <span>Следите за обеими сторонами</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Gavel" size={16} className="text-judge" />
                    <span>Оцените объективно</span>
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
                  Роль <strong>Судьи</strong> рекомендуется для первого прохождения - вы увидите весь процесс со стороны и сможете объективно оценить аргументы!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCourtSession = () => {
    const currentMessage = courtDialog[dialogIndex];
    const question = getCurrentQuestion();
    const answered = taskAnswers[dialogIndex] !== undefined;

    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-4xl mx-auto space-y-6">
          <Progress value={getProgressPercentage()} className="h-3" />
          
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <img 
                src={characters.prosecutor.image}
                alt="Обвинение"
                className={`w-20 h-20 rounded-full border-4 shadow-lg transition-all ${
                  currentMessage.speaker === 'prosecutor' ? 'border-prosecutor scale-110 animate-bounce-subtle' : 'border-gray-300 opacity-60'
                }`}
              />
              <Badge className="mt-2 bg-prosecutor text-white text-xs">Обвинение</Badge>
            </div>

            <div className="text-center">
              <img 
                src={characters.judge.image}
                alt="Судья"
                className={`w-24 h-24 rounded-full border-4 shadow-lg transition-all ${
                  currentMessage.speaker === 'judge' ? 'border-judge scale-110' : 'border-gray-300 opacity-60'
                }`}
              />
              <Badge className="mt-2 bg-judge text-white text-xs">Судья</Badge>
            </div>

            <div className="text-center">
              <img 
                src={characters.defender.image}
                alt="Защита"
                className={`w-20 h-20 rounded-full border-4 shadow-lg transition-all ${
                  currentMessage.speaker === 'defender' ? 'border-defender scale-110 animate-bounce-subtle' : 'border-gray-300 opacity-60'
                }`}
              />
              <Badge className="mt-2 bg-defender text-white text-xs">Защита</Badge>
            </div>
          </div>

          {!question && (
            <Card className="animate-fade-in shadow-xl border-2" style={{ borderColor: `hsl(var(--${getSpeakerColor(currentMessage.speaker)}))` }}>
              <CardHeader style={{ backgroundColor: `hsl(var(--${getSpeakerColor(currentMessage.speaker)}) / 0.1)` }}>
                <div className="flex items-center gap-3">
                  <Badge style={{ backgroundColor: `hsl(var(--${getSpeakerColor(currentMessage.speaker)}))` }} className="text-white">
                    {currentMessage.name}
                  </Badge>
                  {currentMessage.speaker === 'witness' && (
                    <span className="text-2xl">{currentMessage.name === 'Смазка' ? '💧' : currentMessage.name === 'Подшипники' ? '⚙️' : '❄️'}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className={`text-xl leading-relaxed ${currentMessage.emotion === 'angry' ? 'font-bold' : ''}`}>
                  {currentMessage.text}
                </p>
              </CardContent>
            </Card>
          )}

          {question && (
            <Card className="animate-scale-in shadow-xl border-primary border-2">
              <CardHeader className="bg-primary/10">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Icon name="HelpCircle" size={32} className="text-primary" />
                  Вопрос от судьи
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                  <p className="text-xl font-semibold mb-6">{question.question}</p>
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => !answered && handleAnswer(option.correct)}
                        variant={answered ? (option.correct ? 'default' : 'outline') : 'outline'}
                        className={`w-full text-left h-auto py-4 px-6 justify-start text-base ${
                          answered && option.correct
                            ? 'bg-green-500 hover:bg-green-600 text-white border-green-600'
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

                {answered && taskAnswers[dialogIndex] && (
                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 animate-fade-in">
                    <p className="text-green-800 font-semibold flex items-center gap-2">
                      <Icon name="CheckCircle" size={24} />
                      Правильно! Продолжаем процесс...
                    </p>
                  </div>
                )}

                {answered && !taskAnswers[dialogIndex] && (
                  <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 animate-fade-in">
                    <p className="text-red-800 font-semibold flex items-center gap-2">
                      <Icon name="XCircle" size={24} />
                      Подумайте ещё раз и попробуйте снова!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {!question && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Реплика {dialogIndex + 1} из {courtDialog.length}
              </span>
              <Button 
                onClick={handleNextDialog}
                size="lg"
                className="bg-judge hover:bg-judge/90 text-white"
              >
                {dialogIndex < courtDialog.length - 1 ? 'Следующая реплика' : 'Услышать вердикт'}
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderVerdict = () => (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
      <Card className="max-w-3xl w-full animate-scale-in shadow-2xl">
        <CardHeader className="text-center pb-4 bg-judge/10">
          <div className="mb-4 flex justify-center">
            <img 
              src={characters.judge.image}
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
                <strong>Суд установил:</strong> После рассмотрения всех аргументов, показаний свидетелей и горячих дебатов, суд пришёл к выводу...
              </p>
              
              <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4 mt-6">
                <p className="font-bold text-purple-900 text-xl text-center mb-4">
                  🎓 ТРЕНИЕ НЕ ВИНОВНО И НЕ НЕВИНОВНО!
                </p>
                <p className="text-purple-800 text-center">
                  Трение - это физическое явление, которое имеет две стороны. Задача человечества - не бороться с трением, а научиться им УПРАВЛЯТЬ!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-red-900 mb-2">❌ Вредное трение:</p>
                  <ul className="list-disc list-inside space-y-1 text-red-800 text-sm">
                    <li>Изнашивает механизмы</li>
                    <li>Выделяет избыточное тепло</li>
                    <li>Требует дополнительной энергии</li>
                    <li><strong>Решение:</strong> смазка, подшипники</li>
                  </ul>
                </div>

                <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-green-900 mb-2">✅ Полезное трение:</p>
                  <ul className="list-disc list-inside space-y-1 text-green-800 text-sm">
                    <li>Позволяет ходить и двигаться</li>
                    <li>Обеспечивает работу тормозов</li>
                    <li>Удерживает предметы на месте</li>
                    <li><strong>Усиление:</strong> шипы, протекторы</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4">
                <p className="font-semibold text-blue-900 mb-2">💡 Вывод суда:</p>
                <p className="text-blue-800">
                  Человечество научилось <strong>управлять трением:</strong> уменьшать там, где оно вредит, и усиливать там, где оно необходимо. 
                  Это пример мудрого использования законов физики!
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={() => {
                setStage('intro');
                setPlayerRole(null);
                setDialogIndex(0);
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
      {stage === 'court-session' && renderCourtSession()}
      {stage === 'verdict' && renderVerdict()}
    </>
  );
};

export default Index;
