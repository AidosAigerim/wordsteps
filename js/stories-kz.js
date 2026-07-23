// WordSteps — раздел «🇰🇿 Мой Казахстан». Истории из выученных слов про родную страну.
// Привязаны к уровням (a1/a2/b1) для словарного запаса, открываются по полю after (пройдено уроков уровня).
const STORIES_KZ = {
  a1: [
    {
      t: "My City Shymkent", ru: "Мой город Шымкент", after: 6,
      p: [
        "Hi! My name is Arman. I am a boy from Shymkent. Shymkent is a big city in Kazakhstan, and it is my home.",
        "In the day the sun is hot and the sky is blue. Shymkent is a warm city. I like it very much.",
        "In the morning I go to school with my friend Alik. On the street we see cars, a big bus and many people.",
        "My mother and I go to the market. We buy bread, meat, fruit and red apples. The food here is very good.",
        "After school I go to the park. There are green trees, a little river and many birds. Boys and girls play here. I am happy.",
        "At night I look at the sky and see the stars. Shymkent is a good home. I love my city!"
      ],
      q: [
        { q: "Откуда Арман?", o: ["Из Шымкента", "Из Алматы", "Из Астаны", "Из Тараза"], a: 0 },
        { q: "Какая погода днём в Шымкенте?", o: ["Идёт снег", "Солнце жаркое, небо синее", "Холодно и дождь", "Сильный ветер"], a: 1 },
        { q: "Что Арман с мамой покупают на рынке?", o: ["Хлеб, мясо, фрукты и яблоки", "Одежду", "Книги", "Игрушки"], a: 0 },
        { q: "Куда Арман идёт после школы?", o: ["Домой спать", "В парк", "В магазин", "На вокзал"], a: 1 }
      ]
    },
    {
      t: "Summer in the Aul", ru: "Лето в ауле", after: 12,
      p: [
        "In summer I go to the aul — the home of my grandmother and grandfather. It is far from the big city.",
        "My grandfather has many animals: a big horse, two cows, sheep and a good dog. In the morning I give them water and grass.",
        "My grandmother makes bread and gives me warm milk. The milk is from our cow. It is very good!",
        "In the day I go with my grandfather. We see the green grass, the high mountains and the blue sky. The air is cool and clean.",
        "At night the sky is dark and I see many, many stars. In the city I cannot see so many stars.",
        "I love the aul. Here I am happy with my family. Summer in the aul is the best!"
      ],
      q: [
        { q: "К кому Арман едет летом?", o: ["К бабушке и дедушке", "К друзьям в город", "В школу", "К морю"], a: 0 },
        { q: "Какие животные есть у дедушки?", o: ["Лошадь, коровы, овцы и собака", "Только кошки", "Слон и лев", "Попугаи"], a: 0 },
        { q: "Что даёт бабушка?", o: ["Хлеб и тёплое молоко", "Деньги", "Книги", "Сок"], a: 0 },
        { q: "Почему в ауле видно много звёзд?", o: ["Небо тёмное и чистое, нет городского света", "Звёзды ближе", "Летом их больше", "Дедушка их показывает"], a: 0 }
      ]
    }
  ],

  a2: [
    {
      t: "Nauryz — Our Spring Holiday", ru: "Наурыз — наш весенний праздник", after: 6,
      p: [
        "Nauryz is our big holiday. It comes in spring, on the twenty-first of March. All people in Kazakhstan love Nauryz.",
        "On Nauryz the cold winter is over. The sun is warm, the snow goes and the trees are green.",
        "My family cooks a big dinner. We make sweet food and a good drink. My mother invites many guests to our home.",
        "The guests come, and we eat together. Old people tell good stories, and children play games.",
        "People sing songs and dance. Some people play the dombra — it is our music. All people are happy!",
        "Nauryz is my best holiday. It is the start of spring and a new year. Happy Nauryz!"
      ],
      q: [
        { q: "Когда празднуют Наурыз?", o: ["Весной, 21 марта", "Зимой", "Летом", "Осенью"], a: 0 },
        { q: "Что делает семья на Наурыз?", o: ["Готовит большой ужин и зовёт гостей", "Едет к морю", "Идёт в школу", "Спит весь день"], a: 0 },
        { q: "На каком инструменте играют?", o: ["На домбре", "На гитаре", "На пианино", "На барабане"], a: 0 },
        { q: "Что означает Наурыз?", o: ["Начало весны и нового года", "Конец лета", "День рождения", "Праздник урожая"], a: 0 }
      ]
    },
    {
      t: "Beshbarmak — Our Food", ru: "Бешбармак — наша еда", after: 12,
      p: [
        "Beshbarmak is our special food in Kazakhstan. We make it when guests come to our home.",
        "My grandmother is the best cook. First she cooks the meat for a long time.",
        "Then she makes special bread and puts onion on it. Beshbarmak has meat, bread and onion. It is very good and hot.",
        "All the family is at the big table. We eat it with our hands, because the name is 'five fingers' in Kazakh!",
        "The guests eat and say: «Thanks! It is very good!» My grandmother is happy.",
        "I love beshbarmak. When you eat it, you feel the warm home of Kazakhstan."
      ],
      q: [
        { q: "Когда готовят бешбармак?", o: ["Когда приходят гости", "Каждое утро", "Только зимой", "На завтрак"], a: 0 },
        { q: "Кто в семье лучший повар?", o: ["Бабушка", "Папа", "Брат", "Сосед"], a: 0 },
        { q: "Из чего состоит бешбармак?", o: ["Мясо, тесто (хлеб) и лук", "Рис и рыба", "Овощи и сыр", "Курица и картофель"], a: 0 },
        { q: "Что значит слово «бешбармак»?", o: ["«Пять пальцев»", "«Большая еда»", "«Праздник»", "«Горячее блюдо»"], a: 0 }
      ]
    }
  ],

  b1: [
    {
      t: "Kazakhstan — My Country", ru: "Казахстан — моя страна", after: 6,
      p: [
        "Kazakhstan is my country. It is a huge country with a beautiful and wild nature.",
        "We have high mountains, big rivers, blue lakes and the steppe. The steppe is like a green sea.",
        "Our culture is old and rich. We have many traditions. On holidays people wear beautiful clothes and play the dombra.",
        "Before, our people lived in a yurt — a special home — and had many horses. The horse is very important for us.",
        "Today Kazakhstan is a modern country. We have new cities, technology and good schools. But we do not forget our traditions.",
        "I am proud of my country. Kazakhstan is my home, and I love it."
      ],
      q: [
        { q: "Какой Казахстан по размеру?", o: ["Огромная страна", "Маленькая страна", "Остров", "Один город"], a: 0 },
        { q: "С чем в тексте сравнивают степь?", o: ["С зелёным морем", "С высокой горой", "С большим городом", "С рекой"], a: 0 },
        { q: "Где раньше жил народ?", o: ["В юрте", "В большом доме", "В городе", "У моря"], a: 0 },
        { q: "Какой Казахстан сегодня?", o: ["Современная страна, но помнит традиции", "Забыл все традиции", "Без городов", "Совсем не изменился"], a: 0 }
      ]
    },
    {
      t: "Almaty and Astana", ru: "Алматы и Астана — два города", after: 12,
      p: [
        "Kazakhstan has two big cities: Almaty and Astana. They are very different, but I like them very much.",
        "Almaty is an old city near high mountains. In the mountains there is snow, and people go there to walk and rest.",
        "Almaty is green, with many trees, gardens and apples. In our language, Almaty is «the city of apples»!",
        "Astana is the new, modern city — the heart of the country. Here you can see amazing houses and new technology.",
        "In winter Astana is very cold, but the people are warm and kind. The city is young and very modern.",
        "One city is old, the other is new. Together they show my beautiful country, Kazakhstan."
      ],
      q: [
        { q: "Возле чего находится Алматы?", o: ["Возле высоких гор", "У моря", "В пустыне", "На острове"], a: 0 },
        { q: "Что значит название «Алматы»?", o: ["Город яблок", "Белый город", "Новая столица", "Зелёная долина"], a: 0 },
        { q: "Какая Астана?", o: ["Новый, современный город", "Старый город", "Маленькая деревня", "Портовый город"], a: 0 },
        { q: "Что общего у двух городов по тексту?", o: ["Вместе показывают красивый Казахстан", "Оба очень старые", "Оба стоят у моря", "Они одинаковые"], a: 0 }
      ]
    }
  ]
};

// Казахстанские слова/имена для кликабельного словарика в читалке.
const KZ_WORDS = {
  "kazakhstan": ["ˌkæzəkˈstɑːn", "Казахстан (страна)"],
  "kazakh": ["kəˈzɑːk", "казахский; казах"],
  "nauryz": ["nɑːˈruːz", "Наурыз (праздник весны)"],
  "aul": ["ɑːˈuːl", "аул (село)"],
  "beshbarmak": ["beʃbɑːrˈmɑːk", "бешбармак (блюдо)"],
  "steppe": ["step", "степь"],
  "dombra": ["dɒmˈbrɑː", "домбра (инструмент)"],
  "yurt": ["jɜːt", "юрта"],
  "almaty": ["ˌɑːlmɑːˈtiː", "Алматы (город)"],
  "astana": ["ˌæstɑːˈnɑː", "Астана (город)"]
};

// Домешиваем казахстанские слова в общий словарик читалки (SERVICE_WORDS из stories.js).
if (typeof SERVICE_WORDS !== "undefined") Object.assign(SERVICE_WORDS, KZ_WORDS);
