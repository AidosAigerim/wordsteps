// WordSteps — истории для чтения. По 5 на уровень.
// after — история открывается после N пройденных уроков уровня.
// p — абзацы, q — вопросы на понимание (a = индекс правильного ответа).
const STORIES = {
  a1: [
    {
      t: "My Family", ru: "Моя семья", after: 3,
      p: [
        "Hello! My name is Tom. I am a boy. I am ten. I have a big family. We are seven people: mother, father, two boys, two girls and a baby.",
        "My mother is Anna. She is a good woman. My father is Mark. He is a big man. My sister Kate is fifteen. My brother Sam is thirteen. And my little sister is a baby. She is one.",
        "My grandmother and my grandfather are not young, but they are happy. I love them very much. My aunt and my uncle have one son. He is my cousin. His name is Alex. He is eleven.",
        "My baby sister has five little fingers on one hand. We count them: one, two, three, four, five! Then we count to ten: six, seven, eight, nine, ten. She smiles.",
        "In the morning I say: «Good morning, mother!» In the night I say: «Good night!» My family is number one for me. Goodbye, friends! Thanks!"
      ],
      q: [
        { q: "Сколько лет Тому?", o: ["Восемь", "Десять", "Тринадцать", "Пятнадцать"], a: 1 },
        { q: "Как зовут маму Тома?", o: ["Кейт", "Анна", "Дана", "Мария"], a: 1 },
        { q: "Кто такой Алекс?", o: ["Брат Тома", "Дядя Тома", "Двоюродный брат Тома", "Дедушка Тома"], a: 2 },
        { q: "Сколько человек в семье Тома?", o: ["Пять", "Шесть", "Семь", "Десять"], a: 2 }
      ]
    },
    {
      t: "Our House", ru: "Наш дом", after: 6,
      p: [
        "This is our house. It is big and white. The doors are brown, and the windows are big and light. Our house has five rooms.",
        "We have a green garden. In the garden there is a little table and four chairs. I like to drink juice there. The garden has six green trees, and I see them from my window.",
        "The kitchen is my number one room. The walls are yellow. On the table we have bread, milk, cheese and eggs. In the morning we drink tea or coffee. My father likes fish and rice. My mother makes a big cake for us.",
        "My bedroom is blue. I have a bed, a little table, a chair and a big red box. In the big red box I have my pictures.",
        "On the wall there is a picture and an old gold clock. The bathroom is small and white. My father has a little mirror there.",
        "We love our house. Welcome, friends!"
      ],
      q: [
        { q: "Какого цвета дом?", o: ["Белый", "Синий", "Жёлтый", "Коричневый"], a: 0 },
        { q: "Что стоит в саду?", o: ["Кровать", "Столик и четыре стула", "Диван", "Зеркало"], a: 1 },
        { q: "Какого цвета стены на кухне?", o: ["Белые", "Синие", "Жёлтые", "Зелёные"], a: 2 },
        { q: "Что лежит в большой красной коробке?", o: ["Ключи", "Яблоки", "Картинки", "Часы"], a: 2 }
      ]
    },
    {
      t: "My Cat and My Dog", ru: "Мои кот и пёс", after: 9,
      p: [
        "I have a cat and a dog. My cat is Sima. She is grey and very beautiful. She has big green eyes, a small pink nose and white teeth. Her ears are little.",
        "My dog is Rex. He is black and brown. He is big and fast. He has four big legs and a good nose. His eyes are brown.",
        "Sima likes milk and fish. Rex likes meat and bread. In the morning they eat, and then they sleep. The cat sleeps on my bed. The dog sleeps at the door.",
        "From the window Sima looks at the birds. Rex looks at a little grey mouse. But they do not take them! They are good. Sima plays with my socks. Rex plays with an old boot. They are happy!",
        "My sister has a rabbit. He is white, and his eyes are red. He eats apples. Three animals in one house! And we love them.",
        "I have a black hat and a blue scarf. My dog has a hat too! People look at him and smile: «Hello, dog!»"
      ],
      q: [
        { q: "Какого цвета кошка Сима?", o: ["Серая", "Чёрная", "Белая", "Коричневая"], a: 0 },
        { q: "Что любит Рекс?", o: ["Молоко и рыбу", "Мясо и хлеб", "Яблоки", "Торт"], a: 1 },
        { q: "Кто есть у сестры?", o: ["Птица", "Мышь", "Кролик", "Ещё одна кошка"], a: 2 },
        { q: "Что носит собака?", o: ["Шарф", "Носки", "Шляпу", "Перчатки"], a: 2 }
      ]
    },
    {
      t: "One Day in the City", ru: "Один день в городе", after: 12,
      p: [
        "Today is Saturday. The weather is good: the sun is in the blue sky, and there are no clouds. It is warm. No rain today!",
        "My father and I go to the city. We take the bus number five. Father buys two tickets. I look at the streets, cars and houses from the window.",
        "The city is big. Here is a bank, and there is a hospital. Here is a school, and there is an old bridge. We have a map, but my father knows the roads.",
        "We go to the market. At the market we buy apples, cheese and bread. Then we go to the big supermarket. Father buys milk, rice and chocolate for mother.",
        "Then we go to the park. In the park we see a river and a little bridge. Birds are in the trees. We eat cake and drink tea.",
        "At six we take the train home. The train is fast. What a good day in the city! In the night I think about the streets, the park and the river. I sleep and smile."
      ],
      q: [
        { q: "Какой сегодня день?", o: ["Понедельник", "Пятница", "Суббота", "Воскресенье"], a: 2 },
        { q: "На чём они едут в город?", o: ["На такси", "На автобусе номер пять", "На машине", "На велосипеде"], a: 1 },
        { q: "Что они покупают на рынке?", o: ["Яблоки, сыр и хлеб", "Молоко и рис", "Торт", "Билеты"], a: 0 },
        { q: "Что они видят в парке?", o: ["Банк", "Реку и мостик", "Вокзал", "Больницу"], a: 1 }
      ]
    },
    {
      t: "My School Week", ru: "Моя школьная неделя", after: 15,
      p: [
        "Hello! I am Aidana. I am nine. I go to school five days: Monday, Tuesday, Wednesday, Thursday and Friday. On Saturday and Sunday I am at home.",
        "My school is big and light. My teacher is Miss May. She is good and happy. In the class we read books, write words and think. Our lessons are not long. On the wall we have a big map and a white clock.",
        "I like to read. It is easy for me. My brother says it is hard. He likes numbers and questions.",
        "In my bag I have a pen, three pencils, paper and two books. My friend Tim has a computer. We look at pictures of animals: elephants, lions and tigers! Tim writes fast, but I write right!",
        "At twelve we eat. I drink milk and eat bread with cheese. Then we have two lessons. Then we go home.",
        "In the night I read and sleep. On Sunday mother and I make a big cake. School is work, but I am happy there. Books are my friends!"
      ],
      q: [
        { q: "Сколько дней Айдана ходит в школу?", o: ["Четыре", "Пять", "Шесть", "Семь"], a: 1 },
        { q: "Как зовут учительницу?", o: ["Мисс Мэй", "Мисс Анна", "Мисс Кейт", "Мисс Дана"], a: 0 },
        { q: "Что Айдане легко?", o: ["Писать", "Читать", "Считать", "Рисовать"], a: 1 },
        { q: "Что Айдана делает с мамой в воскресенье?", o: ["Читает книги", "Идёт в школу", "Делает торт", "Играет с Тимом"], a: 2 }
      ]
    }
  ],

  a2: [
    {
      t: "Breakfast in the Café", ru: "Завтрак в кафе", after: 3,
      p: [
        "On Sunday morning my father and I go to a little café near our house. I like these mornings!",
        "The menu is big: eggs with tomatoes, bread with butter and cheese, sweet cakes and fruit. I want it all!",
        "A young woman comes to our table. We order breakfast: two cups of tea, a glass of juice, eggs and bread with butter. The knife, the fork and the spoon are on the plate. The cups are warm. I look at the people in the café: they talk, laugh and drink coffee.",
        "I eat my breakfast. The eggs are good, and the tea is sweet. Father drinks coffee. He says: «Good coffee is number one in the morning!»",
        "Father pays with a card. The breakfast is not expensive. We say: «Thanks!» and take a bottle of water for the road.",
        "Then we go to the market. We buy potatoes, onions and tomatoes for dinner. Today there is a big sale, and the prices are cheap. Mother is happy: we save money!",
        "In the night we have a good dinner: soup and rice with meat. Then we eat chocolate. It is sweet. I love Sundays!"
      ],
      q: [
        { q: "Куда идут папа и сын утром?", o: ["В кафе", "В ресторан", "В школу", "На вокзал"], a: 0 },
        { q: "Чем платит папа?", o: ["Наличными", "Картой", "Он не платит", "Монетами"], a: 1 },
        { q: "Почему цены на рынке низкие?", o: ["Ещё утро", "Большая распродажа", "Мало людей", "Зима"], a: 1 },
        { q: "Что у семьи на ужин?", o: ["Яйца", "Суп и рис с мясом", "Торт", "Картофель"], a: 1 }
      ]
    },
    {
      t: "A Trip to the Sea", ru: "Поездка к морю", after: 6,
      p: [
        "This month we travel to the sea! It is our big family trip. We take our passports, the tickets and the luggage. I take my camera. Mother takes hats for all the family, because the sun is hot.",
        "We go by train. The trip is long, but I look at the mountains and rivers from the window. Beautiful!",
        "We stay in a little hotel near the beach. Our room is small but light, and the window looks at the sea!",
        "In the morning we swim in the sea. The water is warm. My sister swims like a little dolphin! Then we play football on the beach. Father runs fast, but he cannot win!",
        "One day a guide takes us on a tour to a green island. The guide tells about the island, the birds and the fish. I make many photos with my camera.",
        "We buy souvenirs and postcards. I choose a gift for my friend: a little gold fish. Father buys a picture for our house. It is not expensive.",
        "I am excited, but a little sad too: tomorrow we leave. We arrive home in the night. Goodbye, sea! It was a good trip. I hope we return!"
      ],
      q: [
        { q: "На чём семья едет к морю?", o: ["На автобусе", "На поезде", "На машине", "На самолёте"], a: 1 },
        { q: "Где живёт семья?", o: ["В большом доме", "В отеле у пляжа", "На острове", "У бабушки"], a: 1 },
        { q: "Куда их везёт гид?", o: ["В горы", "На зелёный остров", "В музей", "На рынок"], a: 1 },
        { q: "Какой подарок для друга?", o: ["Открытка", "Золотая рыбка", "Картина", "Шляпа"], a: 1 }
      ]
    },
    {
      t: "My Friend Dana", ru: "Моя подруга Дана", after: 9,
      p: [
        "My friend Dana is tall and thin. She has long black hair and big brown eyes. She is pretty and very kind.",
        "Dana is clever and funny. She is never rude. She is polite, honest and friendly. All people like her. She helps her mother at home: she washes and cleans.",
        "Dana's mother is a doctor. Her father is an engineer. Her brother is a singer — he sings in the morning, in the day and in the night. He is loud!",
        "Dana wants to be an artist. She draws animals, houses and the sea. Her pictures are beautiful. In the park we draw: I draw a dog, she draws a horse. My dog looks like a mouse! I think she is very smart.",
        "In March Dana has a birthday. She invites guests to the party: me, Tim and five girls from our class. Her grandmother makes a big sweet cake with apples. We eat cake, drink juice, play games and dance. We laugh very much!",
        "I give her a gift: new pencils and paper for her pictures. She smiles: «Thanks! You are a good friend.» I am proud of my friend Dana."
      ],
      q: [
        { q: "Какие волосы у Даны?", o: ["Короткие белые", "Длинные чёрные", "Рыжие", "Серые"], a: 1 },
        { q: "Кем работает мама Даны?", o: ["Медсестрой", "Врачом", "Учителем", "Художником"], a: 1 },
        { q: "Кем хочет стать Дана?", o: ["Певицей", "Врачом", "Художницей", "Инженером"], a: 2 },
        { q: "Когда у Даны день рождения?", o: ["В январе", "В марте", "В мае", "В июле"], a: 1 }
      ]
    },
    {
      t: "Marat Is Ill", ru: "Марат заболел", after: 12,
      p: [
        "On Monday Marat is ill. He has a fever, a cough and a headache. He sneezes and sneezes. His body hurts. He cannot eat, he wants water. He is sick and very sad.",
        "Mother calls the doctor. The doctor comes and looks at the patient. He is calm: «Do not be afraid. Drink warm tea with milk. Take this medicine: one pill in the morning and one pill in the night. Rest and sleep!»",
        "Marat stays in bed. He drinks water and tea, takes the pills and sleeps. Mother makes soup. Grandmother brings apples and says kind words. Mother closes the curtains, and Marat sleeps two hours.",
        "His friends send messages: «How are you? We wait for you!» In the day they call him. Marat talks with them and looks at funny videos on the internet. He laughs and feels good.",
        "On Thursday Marat recovers. The fever goes down, the cough stops. He is healthy! He runs, jumps and sings.",
        "On Friday he returns to school. The teacher smiles: «Welcome!» His friends are happy. Now Marat says: «Health is number one! Eat fruit, drink milk, walk — and you recover fast.»"
      ],
      q: [
        { q: "Что у Марата в понедельник?", o: ["Болит нога", "Жар, кашель и головная боль", "Болит зуб", "Травма"], a: 1 },
        { q: "Что говорит врач?", o: ["Идти в школу", "Пить лекарство и отдыхать", "Много бегать", "Ничего не есть"], a: 1 },
        { q: "Что делают друзья Марата?", o: ["Забывают о нём", "Пишут сообщения и звонят", "Приходят в гости", "Дарят подарки"], a: 1 },
        { q: "Когда Марат выздоравливает?", o: ["В понедельник", "В среду", "В четверг", "В воскресенье"], a: 2 }
      ]
    },
    {
      t: "The Little Turtle", ru: "Маленькая черепаха", after: 15,
      p: [
        "This is a story about a little turtle. Her name is Tortila. Her home is near the sea, between the river and the forest.",
        "Tortila is slow but very clever. In the morning she usually swims in the sea. Dolphins jump over her and laugh. She is never afraid of the big whale, because the whale is her old friend.",
        "But when Tortila sees a shark, she goes inside her little house. Her house is always with her, on her back!",
        "Outside, high in the sky, an eagle looks at her. But he cannot eat her, because her house is very hard. The eagle is angry, and Tortila smiles inside.",
        "In the day, bees and butterflies dance over the grass. An old owl sleeps in the tree. A green frog jumps in the lake and sings his loud song: «Kva-kva!»",
        "Sometimes Tortila walks far, very far. Her friends ask: «Where is Tortila?» The frog looks under the tree. The owl looks behind the forest. But Tortila always returns home, because she loves her home.",
        "When the night comes, the sea sings a quiet song for the little turtle. The stars are bright. Good night, Tortila!"
      ],
      q: [
        { q: "Где дом Тортилы?", o: ["В городе", "У моря, между рекой и лесом", "На острове", "В горах"], a: 1 },
        { q: "Почему она не боится кита?", o: ["Кит маленький", "Кит — её старый друг", "Кит спит", "Кита нет"], a: 1 },
        { q: "Что делает Тортила, когда видит акулу?", o: ["Плывёт быстро", "Прячется в свой домик на спине", "Зовёт орла", "Поёт песню"], a: 1 },
        { q: "Почему орёл не может её съесть?", o: ["Она быстрая", "Её домик очень твёрдый", "Он не голодный", "Она далеко"], a: 1 }
      ]
    }
  ],

  b1: [
    {
      t: "A New Student at University", ru: "Новый студент в университете", after: 3,
      p: [
        "Aidar is a new student at the university. He studies science, because he wants to get a degree and succeed in life.",
        "His main subjects are mathematics, physics and chemistry. The courses are not easy: they require practice, time and real knowledge. But Aidar knows what he wants.",
        "Every morning he goes to the library. He reads books and articles, writes and thinks. Practice gives him new skills and new experience. In the library he meets students from his college. They ask questions and help him.",
        "His friend Sara studies literature and language. She reads novels and wants to be a journalist. She wants to write about culture and society.",
        "In January the students have exams. Aidar is worried: the questions are hard, and the marks are important. Sara helps Aidar with language, and he helps her with mathematics. Friends make hard days easy.",
        "Aidar passes all the exams with good marks! Sara passes too. They do not fail, because they work every day. The teachers say: «You succeed, because you love knowledge.»",
        "In the night the students talk about the future: work, career, companies. Aidar says: «Education is my freedom. Knowledge opens all the doors in society.» And he is right."
      ],
      q: [
        { q: "Что изучает Айдар?", o: ["Литературу", "Науку: математику, физику и химию", "Языки", "Историю"], a: 1 },
        { q: "Куда Айдар ходит каждое утро?", o: ["В кафе", "В библиотеку", "На стадион", "В офис"], a: 1 },
        { q: "Кем хочет стать Сара?", o: ["Учёным", "Журналисткой", "Врачом", "Менеджером"], a: 1 },
        { q: "Почему друзья сдают экзамены?", o: ["Им везёт", "Они работают каждый день", "Экзамены лёгкие", "Учителя добрые"], a: 1 }
      ]
    },
    {
      t: "The Job Interview", ru: "Собеседование", after: 6,
      p: [
        "Dias reads the news online: a big technology company wants to hire young people. «This is for me!» — he thinks.",
        "He writes an application and sends it to the company. In two days the company calls: «We invite you to an interview on Friday at ten.»",
        "On Friday Dias is nervous, but he looks calm. The office is big and light. The employer and two employees meet him in the department.",
        "They ask about his skills and his experience. Dias tells about his projects at the university. He shows a presentation with data, photos and results.",
        "«Why do you want to work here?» — asks the employer. «Because I want to make new technology, and because your company makes the future», — says Dias.",
        "The employer smiles: «We hire you! Here is the contract. Your salary is good, and your colleagues are friendly. Your first task has a deadline on Monday: a report for an important client.»",
        "Dias reads the contract two times and says: «Yes!» Now he is an employee of the company.",
        "He works with his new colleagues on a big project. It is not easy, but Dias likes it. With his first income he buys a gift for his mother. His business life starts!"
      ],
      q: [
        { q: "Где Диас находит новость о работе?", o: ["В газете", "В интернете", "От друга", "В офисе"], a: 1 },
        { q: "Что он отправляет в компанию?", o: ["Письмо маме", "Заявку", "Отчёт", "Контракт"], a: 1 },
        { q: "Что Диас показывает на собеседовании?", o: ["Паспорт", "Презентацию с данными и результатами", "Диплом", "Фото семьи"], a: 1 },
        { q: "Что он покупает с первого дохода?", o: ["Ноутбук", "Подарок маме", "Машину", "Билет на море"], a: 1 }
      ]
    },
    {
      t: "The Green City Project", ru: "Проект «Зелёный город»", after: 9,
      p: [
        "The city has a big problem: pollution. The cars and the old fuel destroy the health of people and nature. Pollution hurts people, animals and the planet.",
        "Young scientists decide to protect the environment. They suggest a project: «The Green City». Their idea is clean energy and clean air.",
        "They explain the project in the media. A journalist writes an article in the newspaper. The channels tell about it in the news. All the city discusses the idea.",
        "The plan: recycle the waste, use the energy of the sun, not fuel, and put many new trees in the parks and the streets.",
        "Some people disagree: «It is expensive! Electricity from the sun? It is not for our city!» But the scientists do not stop. They prove with data: clean energy reduces the prices in ten years.",
        "The government agrees and supports the project. The banks invest money. People of the city help too: they recycle, and they go by bus, not by car.",
        "In five years the city improves. The air is clean. The electricity comes from the sun. Birds return to the parks, and the rivers are clean too. The wild nature survives.",
        "The scientists say: «We believe in science. When people decide and do not stop, they can make the future clean.»"
      ],
      q: [
        { q: "Какая проблема у города?", o: ["Нет школ", "Загрязнение", "Дорогие продукты", "Мало парков"], a: 1 },
        { q: "Как называется проект?", o: ["«Чистая вода»", "«Зелёный город»", "«Новый парк»", "«Солнце»"], a: 1 },
        { q: "Кто рассказывает городу о проекте?", o: ["Полиция", "СМИ: журналисты и каналы", "Банки", "Школы"], a: 1 },
        { q: "Что происходит через пять лет?", o: ["Ничего", "Город становится чище", "Проект закрывают", "Все уезжают"], a: 1 }
      ]
    },
    {
      t: "Sweet Home", ru: "Маленький бизнес тёти Розы", after: 12,
      p: [
        "Aunt Roza makes the best cakes in the city. Her friends say: «Roza, it is a business! People pay money for this quality!»",
        "But Roza is poor. She has no money for a big oven. Therefore she goes to the bank and takes a loan. Now she has a debt, and her budget is very small.",
        "Roza invests all the money in a good oven, the best chocolate and the best butter. She makes a brand: «Sweet Home». Her sister helps with advertising online: beautiful photos of cakes every day.",
        "The start is hard. The first month Roza earns a small amount. But she believes in her quality. She offers discounts for the first clients. She works in the morning and in the night.",
        "People try the cakes and return: «The quality is high, and the prices are average. It is not luxury — it is for all!» More and more clients come. Rich and poor, young and old — all love «Sweet Home».",
        "In two years Roza returns the debt to the bank. Her income increases every month. She hires two employees and opens a little café. Now all the city knows her brand.",
        "Roza says: «Wealth is not luxury and gold. Wealth is your work, your quality and your honest name. Poverty is not the end, when you work and believe.» Her story proves it."
      ],
      q: [
        { q: "Что делает тётя Роза?", o: ["Шьёт одежду", "Печёт торты", "Рисует картины", "Учит детей"], a: 1 },
        { q: "Что Роза берёт в банке?", o: ["Карту", "Кредит", "Работу", "Валюту"], a: 1 },
        { q: "Почему клиенты возвращаются?", o: ["Высокое качество и средние цены", "Это роскошь", "Реклама по телевизору", "Всё бесплатно"], a: 0 },
        { q: "Что происходит через два года?", o: ["Роза закрывает бизнес", "Роза возвращает долг и нанимает работников", "Роза уезжает", "Роза берёт новый кредит"], a: 1 }
      ]
    },
    {
      t: "The Choice", ru: "Выбор", after: 15,
      p: [
        "Aliya has a good job in a big company, however her routine is always the same: home, office, home. Her schedule is full, but her heart asks: «Where is your goal?»",
        "One day she gets an opportunity: the company offers her work abroad, in a foreign country. It is a big chance, although it is a hard choice.",
        "She asks for advice. Mother says: «Stay. Home is here.» Her friend gives another suggestion: «Go! You are still young. Perhaps this is your one chance in life.»",
        "Aliya thinks during many days. She compares all the reasons. «What is the effect of a mistake? Failure? However, without a decision there is no result.»",
        "Therefore she makes her decision. She reserves a ticket and takes the flight abroad. The departure is in the morning; almost all her family comes to the airport.",
        "The journey is not easy: a foreign language, a new situation, strange streets. Sometimes she almost cries, because home is far. But she does not return until she achieves her goal.",
        "During the year Aliya works and studies the language. Her habit now is practice, not fear. And the result comes: her project is a success, and her fear is small.",
        "She writes to her friend: «Thanks for your advice. The right choice is not the easy choice. Despite all the hard days, I am happy. My life is my plan — not my old habit. And yes: my journey gives me the answer.»"
      ],
      q: [
        { q: "Что компания предлагает Алие?", o: ["Новую машину", "Работу за границей", "Отпуск", "Большую зарплату"], a: 1 },
        { q: "Какой совет даёт подруга?", o: ["Остаться дома", "Ехать", "Сменить работу", "Подождать год"], a: 1 },
        { q: "Когда Алия возвращается домой?", o: ["Через месяц", "Сразу же", "Она не возвращается, пока не достигнет цели", "Через неделю"], a: 2 },
        { q: "Что Алия пишет подруге?", o: ["«Это была ошибка»", "«Правильный выбор — не самый лёгкий»", "«Я возвращаюсь»", "«Здесь очень скучно»"], a: 1 }
      ]
    }
  ]
};

// Служебные слова для словарика в читалке (артикли, местоимения, предлоги…)
// Формат: слово (в нижнем регистре) → [транскрипция, перевод]
const SERVICE_WORDS = {
  "the": ["ðə", "артикль: этот, тот самый"],
  "a": ["ə", "артикль: один, какой-то"],
  "an": ["ən", "артикль перед гласной"],
  "of": ["əv", "кого?/чего?; из"],
  "to": ["tuː", "к, в; чтобы"],
  "in": ["ɪn", "в"],
  "on": ["ɒn", "на"],
  "at": ["æt", "у, в, на (место/время)"],
  "from": ["frɒm", "из, от"],
  "with": ["wɪð", "с"],
  "for": ["fɔː", "для, за"],
  "about": ["əˈbaʊt", "о, про"],
  "by": ["baɪ", "на (транспорте); рядом; кем"],
  "into": ["ˈɪntə", "внутрь, в"],
  "up": ["ʌp", "вверх"],
  "down": ["daʊn", "вниз"],
  "out": ["aʊt", "наружу"],
  "i": ["aɪ", "я"],
  "you": ["juː", "ты, вы"],
  "he": ["hiː", "он"],
  "she": ["ʃiː", "она"],
  "it": ["ɪt", "оно, это"],
  "we": ["wiː", "мы"],
  "they": ["ðeɪ", "они"],
  "me": ["miː", "меня, мне"],
  "him": ["hɪm", "его, ему"],
  "her": ["hɜː", "её, ей"],
  "us": ["ʌs", "нас, нам"],
  "them": ["ðem", "их, им"],
  "my": ["maɪ", "мой"],
  "your": ["jɔː", "твой, ваш"],
  "his": ["hɪz", "его"],
  "its": ["ɪts", "его (о предмете)"],
  "our": ["ˈaʊə", "наш"],
  "their": ["ðeə", "их"],
  "am": ["æm", "есть (я)"],
  "is": ["ɪz", "есть (он/она/оно)"],
  "are": ["ɑː", "есть (мы/вы/они)"],
  "was": ["wɒz", "был, была"],
  "were": ["wɜː", "были"],
  "been": ["biːn", "был (форма be)"],
  "has": ["hæz", "имеет"],
  "had": ["hæd", "имел"],
  "does": ["dʌz", "делает (вспомогательный)"],
  "did": ["dɪd", "делал (вспомогательный)"],
  "will": ["wɪl", "будет (будущее время)"],
  "would": ["wʊd", "бы"],
  "can": ["kæn", "мочь, уметь"],
  "cannot": ["ˈkænɒt", "не мочь"],
  "could": ["kʊd", "мог (бы)"],
  "must": ["mʌst", "должен"],
  "should": ["ʃʊd", "следует"],
  "not": ["nɒt", "не"],
  "so": ["səʊ", "так; поэтому"],
  "too": ["tuː", "тоже; слишком"],
  "also": ["ˈɔːlsəʊ", "также"],
  "then": ["ðen", "затем, тогда"],
  "than": ["ðæn", "чем"],
  "as": ["æz", "как, в роли"],
  "all": ["ɔːl", "все, всё"],
  "every": ["ˈevri", "каждый"],
  "each": ["iːtʃ", "каждый (из)"],
  "other": ["ˈʌðə", "другой"],
  "another": ["əˈnʌðə", "ещё один, другой"],
  "any": ["ˈeni", "любой, какой-нибудь"],
  "only": ["ˈəʊnli", "только"],
  "first": ["fɜːst", "первый"],
  "second": ["ˈsekənd", "второй"],
  "third": ["θɜːd", "третий"],
  "little": ["ˈlɪtəl", "маленький"],
  "same": ["seɪm", "тот же самый"],
  "without": ["wɪˈðaʊt", "без"],
  "life": ["laɪf", "жизнь"],
  "air": ["eə", "воздух"],
  "idea": ["aɪˈdɪə", "идея"],
  "future": ["ˈfjuːtʃə", "будущее"],
  "main": ["meɪn", "главный"],
  "study": ["ˈstʌdi", "учиться, изучать"],
  "country": ["ˈkʌntri", "страна"],
  "miss": ["mɪs", "мисс (обращение); скучать"],
  "real": ["rɪəl", "настоящий"],
  "like": ["laɪk", "как, похожий на"],
  "it's": ["ɪts", "это (= it is)"],
  "don't": ["dəʊnt", "не (= do not)"],
  "i'm": ["aɪm", "я (= I am)"],
  "let's": ["lets", "давай(те)"],
  "count": ["kaʊnt", "считать"],
  "café": ["ˈkæfeɪ", "кафе"],
  "story": ["ˈstɔːri", "история, рассказ"],
  "show": ["ʃəʊ", "показывать"],
  "use": ["juːz", "использовать"],
  "put": ["pʊt", "класть, ставить"],
  "best": ["best", "лучший"],
  "better": ["ˈbetə", "лучше"],
  "end": ["end", "конец"],
  "full": ["fʊl", "полный"]
};
