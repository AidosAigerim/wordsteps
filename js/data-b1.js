// WordSteps — уровень B1: 400 частых слов, 15 уроков (по 26–27 слов).
const DATA_B1 = {
  id: "b1",
  title: "B1 · Средний",
  color: "#8b5cf6",
  desc: "400 слов: общество, карьера, наука, деньги и абстрактные понятия.",
  lessons: [
    {
      t: "Общество и государство",
      tip: "-tion — [шн]: election, tradition. Буква c перед i/e читается [с]: citizen [ˈситизн].",
      w: [
        ["society","səˈsaɪəti","общество"], ["government","ˈgʌvənmənt","правительство"], ["law","lɔː","закон"], ["rule","ruːl","правило"],
        ["citizen","ˈsɪtɪzən","гражданин"], ["community","kəˈmjuːnəti","сообщество"], ["culture","ˈkʌltʃə","культура"], ["tradition","trəˈdɪʃən","традиция"],
        ["custom","ˈkʌstəm","обычай"], ["freedom","ˈfriːdəm","свобода"], ["justice","ˈdʒʌstɪs","справедливость"], ["peace","piːs","мир (покой)"],
        ["war","wɔː","война"], ["crime","kraɪm","преступление"], ["criminal","ˈkrɪmɪnəl","преступник"], ["punishment","ˈpʌnɪʃmənt","наказание"],
        ["prison","ˈprɪzən","тюрьма"], ["vote","vəʊt","голосовать"], ["election","ɪˈlekʃən","выборы"], ["president","ˈprezɪdənt","президент"],
        ["politician","pɒlɪˈtɪʃən","политик"], ["policy","ˈpɒləsi","политика (курс)"], ["tax","tæks","налог"], ["charity","ˈtʃærəti","благотворительность"],
        ["volunteer","vɒlənˈtɪə","волонтёр"], ["protest","ˈprəʊtest","протест"], ["media","ˈmiːdiə","СМИ"]
      ]
    },
    {
      t: "Образование",
      tip: "knowledge [ˈнолидж] — k не читается! ch в chemistry — [к]: [ˈкемистри]. science [ˈсайэнс].",
      w: [
        ["education","edʒʊˈkeɪʃən","образование"], ["university","juːnɪˈvɜːsəti","университет"], ["college","ˈkɒlɪdʒ","колледж"], ["degree","dɪˈgriː","учёная степень"],
        ["course","kɔːs","курс"], ["subject","ˈsʌbdʒɪkt","предмет"], ["science","ˈsaɪəns","наука"], ["history","ˈhɪstəri","история"],
        ["geography","dʒiˈɒgrəfi","география"], ["biology","baɪˈɒlədʒi","биология"], ["chemistry","ˈkemɪstri","химия"], ["physics","ˈfɪzɪks","физика"],
        ["mathematics","mæθəˈmætɪks","математика"], ["literature","ˈlɪtrətʃə","литература"], ["language","ˈlæŋgwɪdʒ","язык"], ["grammar","ˈgræmə","грамматика"],
        ["knowledge","ˈnɒlɪdʒ","знания"], ["skill","skɪl","навык"], ["experience","ɪkˈspɪəriəns","опыт"], ["practice","ˈpræktɪs","практика"],
        ["exam","ɪgˈzæm","экзамен"], ["mark","mɑːk","оценка"], ["fail","feɪl","провалить"], ["pass","pɑːs","сдать"],
        ["succeed","səkˈsiːd","преуспеть"], ["research","rɪˈsɜːtʃ","исследование"], ["library","ˈlaɪbrəri","библиотека"]
      ]
    },
    {
      t: "Работа и карьера",
      tip: "business [ˈбизнис] — читается коротко! colleague [ˈколи:г]. ear в earn — [ё:н].",
      w: [
        ["company","ˈkʌmpəni","компания"], ["business","ˈbɪznɪs","бизнес"], ["employee","ɪmplɔɪˈiː","сотрудник"], ["employer","ɪmˈplɔɪə","работодатель"],
        ["interview","ˈɪntəvjuː","собеседование"], ["application","æplɪˈkeɪʃən","заявка"], ["apply","əˈplaɪ","подавать заявку"], ["hire","ˈhaɪə","нанимать"],
        ["fire","ˈfaɪə","увольнять"], ["promotion","prəˈməʊʃən","повышение"], ["colleague","ˈkɒliːg","коллега"], ["department","dɪˈpɑːtmənt","отдел"],
        ["project","ˈprɒdʒekt","проект"], ["task","tɑːsk","задача"], ["deadline","ˈdedlaɪn","крайний срок"], ["report","rɪˈpɔːt","отчёт"],
        ["presentation","prezənˈteɪʃən","презентация"], ["client","ˈklaɪənt","клиент"], ["partner","ˈpɑːtnə","партнёр"], ["contract","ˈkɒntrækt","контракт"],
        ["agreement","əˈgriːmənt","соглашение"], ["negotiate","nɪˈgəʊʃieɪt","вести переговоры"], ["earn","ɜːn","зарабатывать"], ["income","ˈɪnkʌm","доход"],
        ["profit","ˈprɒfɪt","прибыль"], ["retire","rɪˈtaɪə","выходить на пенсию"], ["unemployed","ʌnɪmˈplɔɪd","безработный"]
      ]
    },
    {
      t: "Природа и экология",
      tip: "flood [флад] — oo читается [а]! ocean [ˈоушн] — ce как [ш]. ear в earth — [ё:]: [ё:с].",
      w: [
        ["environment","ɪnˈvaɪrənmənt","окружающая среда"], ["pollution","pəˈluːʃən","загрязнение"], ["climate","ˈklaɪmət","климат"], ["temperature","ˈtemprətʃə","температура"],
        ["planet","ˈplænɪt","планета"], ["earth","ɜːθ","земля"], ["ocean","ˈəʊʃən","океан"], ["desert","ˈdezət","пустыня"],
        ["jungle","ˈdʒʌŋgəl","джунгли"], ["valley","ˈvæli","долина"], ["hill","hɪl","холм"], ["coast","kəʊst","побережье"],
        ["wave","weɪv","волна"], ["flood","flʌd","наводнение"], ["earthquake","ˈɜːθkweɪk","землетрясение"], ["disaster","dɪˈzɑːstə","катастрофа"],
        ["energy","ˈenədʒi","энергия"], ["fuel","ˈfjuːəl","топливо"], ["oil","ɔɪl","нефть"], ["gas","gæs","газ"],
        ["electricity","ɪlekˈtrɪsəti","электричество"], ["waste","weɪst","отходы"], ["recycle","riːˈsaɪkəl","перерабатывать"], ["protect","prəˈtekt","защищать"],
        ["destroy","dɪˈstrɔɪ","разрушать"], ["survive","səˈvaɪv","выживать"], ["wild","waɪld","дикий"]
      ]
    },
    {
      t: "Наука и техника",
      tip: "machine [мэши́:н] — ch читается [ш]! Но в chemical — [к]: [ˈкемикл].",
      w: [
        ["technology","tekˈnɒlədʒi","технология"], ["machine","məˈʃiːn","механизм"], ["engine","ˈendʒɪn","двигатель"], ["robot","ˈrəʊbɒt","робот"],
        ["invention","ɪnˈvenʃən","изобретение"], ["invent","ɪnˈvent","изобретать"], ["discover","dɪˈskʌvə","открывать (обнаружить)"], ["discovery","dɪˈskʌvəri","открытие"],
        ["experiment","ɪkˈsperɪmənt","эксперимент"], ["laboratory","ləˈbɒrətri","лаборатория"], ["scientist","ˈsaɪəntɪst","учёный"], ["theory","ˈθɪəri","теория"],
        ["method","ˈmeθəd","метод"], ["data","ˈdeɪtə","данные"], ["artificial","ɑːtɪˈfɪʃəl","искусственный"], ["intelligence","ɪnˈtelɪdʒəns","интеллект"],
        ["space","speɪs","космос"], ["rocket","ˈrɒkɪt","ракета"], ["satellite","ˈsætəlaɪt","спутник"], ["gravity","ˈgrævəti","гравитация"],
        ["cell","sel","клетка"], ["brain","breɪn","мозг"], ["chemical","ˈkemɪkəl","химикат"], ["metal","ˈmetəl","металл"],
        ["plastic","ˈplæstɪk","пластик"], ["tool","tuːl","инструмент"], ["device","dɪˈvaɪs","устройство"]
      ]
    },
    {
      t: "СМИ и культура",
      tip: "scene [си:н] — sc читается [с]! exhibition [эксиби́шн] — h не читается. journalist [ˈджё:нэлист].",
      w: [
        ["news","njuːz","новости"], ["newspaper","ˈnjuːzpeɪpə","газета"], ["magazine","mægəˈziːn","журнал"], ["article","ˈɑːtɪkəl","статья"],
        ["journalist","ˈdʒɜːnəlɪst","журналист"], ["headline","ˈhedlaɪn","заголовок"], ["channel","ˈtʃænəl","канал"], ["program","ˈprəʊgræm","программа"],
        ["series","ˈsɪəriːz","сериал"], ["actor","ˈæktə","актёр"], ["actress","ˈæktrəs","актриса"], ["director","dəˈrektə","режиссёр"],
        ["scene","siːn","сцена"], ["audience","ˈɔːdiəns","зрители"], ["performance","pəˈfɔːməns","выступление"], ["theatre","ˈθɪətə","театр"],
        ["cinema","ˈsɪnəmə","кинотеатр"], ["museum","mjuːˈziːəm","музей"], ["gallery","ˈgæləri","галерея"], ["exhibition","eksɪˈbɪʃən","выставка"],
        ["painting","ˈpeɪntɪŋ","живопись"], ["sculpture","ˈskʌlptʃə","скульптура"], ["novel","ˈnɒvəl","роман"], ["poem","ˈpəʊɪm","стихотворение"],
        ["author","ˈɔːθə","автор"], ["festival","ˈfestɪvəl","фестиваль"], ["concert","ˈkɒnsət","концерт"]
      ]
    },
    {
      t: "Отношения и чувства",
      tip: "jealous [ˈджэлэс] — ea читается [э]! anxious [ˈэнкшэс] — xi как [кш].",
      w: [
        ["relationship","rɪˈleɪʃənʃɪp","отношения"], ["marriage","ˈmærɪdʒ","брак"], ["wedding","ˈwedɪŋ","свадьба"], ["divorce","dɪˈvɔːs","развод"],
        ["date","deɪt","свидание"], ["trust","trʌst","доверять"], ["respect","rɪˈspekt","уважать"], ["support","səˈpɔːt","поддерживать"],
        ["argue","ˈɑːgjuː","спорить"], ["argument","ˈɑːgjʊmənt","спор"], ["apologize","əˈpɒlədʒaɪz","извиняться"], ["forgive","fəˈgɪv","прощать"],
        ["jealous","ˈdʒeləs","ревнивый"], ["embarrassed","ɪmˈbærəst","смущённый"], ["disappointed","dɪsəˈpɔɪntɪd","разочарованный"], ["satisfied","ˈsætɪsfaɪd","довольный"],
        ["grateful","ˈgreɪtfəl","благодарный"], ["curious","ˈkjʊəriəs","любопытный"], ["confident","ˈkɒnfɪdənt","уверенный"], ["ashamed","əˈʃeɪmd","пристыженный"],
        ["anxious","ˈæŋkʃəs","тревожный"], ["stress","stres","стресс"], ["mood","muːd","настроение"], ["personality","pɜːsəˈnæləti","личность"],
        ["behaviour","bɪˈheɪvjə","поведение"], ["attitude","ˈætɪtjuːd","отношение (взгляд)"], ["humour","ˈhjuːmə","юмор"]
      ]
    },
    {
      t: "Глаголы мышления",
      tip: "doubt [даут] — b не читается! prove, improve — o читается [у:]. ie в believe — [и:].",
      w: [
        ["achieve","əˈtʃiːv","достигать"], ["avoid","əˈvɔɪd","избегать"], ["accept","əkˈsept","принимать"], ["refuse","rɪˈfjuːz","отказываться"],
        ["agree","əˈgriː","соглашаться"], ["disagree","dɪsəˈgriː","не соглашаться"], ["decide","dɪˈsaɪd","решать"], ["suggest","səˈdʒest","предлагать (идею)"],
        ["offer","ˈɒfə","предлагать (помощь, вещь)"], ["promise","ˈprɒmɪs","обещать"], ["expect","ɪkˈspekt","ожидать"], ["imagine","ɪˈmædʒɪn","воображать"],
        ["remember","rɪˈmembə","помнить"], ["forget","fəˈget","забывать"], ["remind","rɪˈmaɪnd","напоминать"], ["believe","bɪˈliːv","верить"],
        ["doubt","daʊt","сомневаться"], ["explain","ɪkˈspleɪn","объяснять"], ["describe","dɪˈskraɪb","описывать"], ["discuss","dɪˈskʌs","обсуждать"],
        ["mention","ˈmenʃən","упоминать"], ["complain","kəmˈpleɪn","жаловаться"], ["admit","ədˈmɪt","признавать"], ["deny","dɪˈnaɪ","отрицать"],
        ["prove","pruːv","доказывать"], ["improve","ɪmˈpruːv","улучшать"], ["develop","dɪˈveləp","развивать"]
      ]
    },
    {
      t: "Глаголы действия",
      tip: "ei после c читается [и:]: receive [рэси́:в]. ow в allow — [ау]: [элáу].",
      w: [
        ["create","kriˈeɪt","создавать (творить)"], ["produce","prəˈdjuːs","производить"], ["provide","prəˈvaɪd","предоставлять"], ["receive","rɪˈsiːv","получать (принимать)"],
        ["reduce","rɪˈdjuːs","уменьшать"], ["increase","ɪnˈkriːs","увеличивать"], ["continue","kənˈtɪnjuː","продолжать"], ["remain","rɪˈmeɪn","оставаться"],
        ["appear","əˈpɪə","появляться"], ["disappear","dɪsəˈpɪə","исчезать"], ["happen","ˈhæpən","случаться"], ["occur","əˈkɜː","происходить"],
        ["cause","kɔːz","вызывать (быть причиной)"], ["affect","əˈfekt","влиять"], ["prevent","prɪˈvent","предотвращать"], ["allow","əˈlaʊ","разрешать"],
        ["require","rɪˈkwaɪə","требовать"], ["depend","dɪˈpend","зависеть"], ["include","ɪnˈkluːd","включать"], ["contain","kənˈteɪn","содержать"],
        ["belong","bɪˈlɒŋ","принадлежать"], ["compare","kəmˈpeə","сравнивать"], ["consider","kənˈsɪdə","считать (полагать)"], ["realize","ˈrɪəlaɪz","осознавать"],
        ["notice","ˈnəʊtɪs","замечать"], ["recognize","ˈrekəgnaɪz","узнавать"], ["ignore","ɪgˈnɔː","игнорировать"]
      ]
    },
    {
      t: "Важные прилагательные",
      tip: "comfortable [ˈкамфтэбл] — читается короче, чем пишется! ancient [ˈэйншент].",
      w: [
        ["important","ɪmˈpɔːtənt","важный"], ["necessary","ˈnesəsəri","необходимый"], ["possible","ˈpɒsəbəl","возможный"], ["impossible","ɪmˈpɒsəbəl","невозможный"],
        ["available","əˈveɪləbəl","доступный"], ["comfortable","ˈkʌmftəbəl","комфортный"], ["convenient","kənˈviːniənt","удобный"], ["dangerous","ˈdeɪndʒərəs","опасный"],
        ["safe","seɪf","безопасный"], ["serious","ˈsɪəriəs","серьёзный"], ["strange","streɪndʒ","странный"], ["familiar","fəˈmɪliə","знакомый"],
        ["similar","ˈsɪmɪlə","похожий"], ["different","ˈdɪfrənt","разный"], ["various","ˈveəriəs","различный"], ["common","ˈkɒmən","распространённый"],
        ["rare","reə","редкий"], ["special","ˈspeʃəl","особенный"], ["ordinary","ˈɔːdənri","обычный"], ["modern","ˈmɒdən","современный"],
        ["ancient","ˈeɪnʃənt","древний"], ["huge","hjuːdʒ","огромный"], ["tiny","ˈtaɪni","крошечный"], ["entire","ɪnˈtaɪə","целый"],
        ["exact","ɪgˈzækt","точный"], ["obvious","ˈɒbviəs","очевидный"], ["certain","ˈsɜːtən","определённый"]
      ]
    },
    {
      t: "Прилагательные-оценки",
      tip: "-ful читается [фэл]: useful [ˈю:сфэл]. aw — [о:]: awful [ˈо:фэл], awkward.",
      w: [
        ["successful","səkˈsesfəl","успешный"], ["useful","ˈjuːsfəl","полезный"], ["useless","ˈjuːsləs","бесполезный"], ["helpful","ˈhelpfəl","отзывчивый"],
        ["careful","ˈkeəfəl","осторожный"], ["careless","ˈkeələs","небрежный"], ["powerful","ˈpaʊəfəl","мощный"], ["peaceful","ˈpiːsfəl","мирный"],
        ["wonderful","ˈwʌndəfəl","чудесный"], ["terrible","ˈterəbəl","ужасный"], ["horrible","ˈhɒrəbəl","кошмарный"], ["awful","ˈɔːfəl","жуткий"],
        ["amazing","əˈmeɪzɪŋ","удивительный"], ["incredible","ɪnˈkredəbəl","невероятный"], ["excellent","ˈeksələnt","отличный"], ["perfect","ˈpɜːfɪkt","идеальный"],
        ["awkward","ˈɔːkwəd","неловкий"], ["complicated","ˈkɒmplɪkeɪtɪd","сложный"], ["simple","ˈsɪmpəl","простой"], ["typical","ˈtɪpɪkəl","типичный"],
        ["essential","ɪˈsenʃəl","важнейший"], ["effective","ɪˈfektɪv","эффективный"], ["efficient","ɪˈfɪʃənt","рациональный"], ["reliable","rɪˈlaɪəbəl","надёжный"],
        ["responsible","rɪˈspɒnsəbəl","ответственный"], ["independent","ɪndɪˈpendənt","независимый"]
      ]
    },
    {
      t: "Деньги и бизнес",
      tip: "debt [дэт] — b не читается! Ударение меняет смысл: ˈadvertising, но advertisement [эдвё:тисмэнт].",
      w: [
        ["economy","ɪˈkɒnəmi","экономика"], ["trade","treɪd","торговля"], ["finance","ˈfaɪnæns","финансы"], ["loan","ləʊn","кредит"],
        ["debt","det","долг"], ["budget","ˈbʌdʒɪt","бюджет"], ["insurance","ɪnˈʃʊərəns","страховка"], ["invest","ɪnˈvest","инвестировать"],
        ["investment","ɪnˈvestmənt","инвестиция"], ["currency","ˈkʌrənsi","валюта"], ["exchange","ɪksˈtʃeɪndʒ","обмен"], ["value","ˈvæljuː","ценность"],
        ["worth","wɜːθ","стоящий"], ["wealth","welθ","богатство"], ["poverty","ˈpɒvəti","бедность"], ["poor","pɔː","бедный"],
        ["rich","rɪtʃ","богатый"], ["luxury","ˈlʌkʃəri","роскошь"], ["brand","brænd","бренд"], ["advertising","ˈædvətaɪzɪŋ","реклама"],
        ["advertisement","ədˈvɜːtɪsmənt","рекламное объявление"], ["discount","ˈdɪskaʊnt","скидка"], ["quality","ˈkwɒləti","качество"], ["quantity","ˈkwɒntəti","количество"],
        ["amount","əˈmaʊnt","сумма"], ["average","ˈævərɪdʒ","средний"]
      ]
    },
    {
      t: "Путешествия и мир",
      tip: "foreign [ˈфорэн] — g не читается! route [ру:т] — ou как [у:]. abroad [эбро́:д].",
      w: [
        ["journey","ˈdʒɜːni","путешествие"], ["destination","destɪˈneɪʃən","пункт назначения"], ["abroad","əˈbrɔːd","за границей"], ["foreign","ˈfɒrən","иностранный"],
        ["foreigner","ˈfɒrənə","иностранец"], ["border","ˈbɔːdə","граница"], ["embassy","ˈembəsi","посольство"], ["visa","ˈviːzə","виза"],
        ["flight","flaɪt","рейс"], ["departure","dɪˈpɑːtʃə","вылет"], ["arrival","əˈraɪvəl","прибытие"], ["delay","dɪˈleɪ","задержка"],
        ["cancel","ˈkænsəl","отменять"], ["reserve","rɪˈzɜːv","бронировать"], ["crew","kruː","экипаж"], ["pilot","ˈpaɪlət","пилот"],
        ["route","ruːt","маршрут"], ["distance","ˈdɪstəns","расстояние"], ["direction","dəˈrekʃən","направление"], ["north","nɔːθ","север"],
        ["south","saʊθ","юг"], ["east","iːst","восток"], ["west","west","запад"], ["local","ˈləʊkəl","местный"],
        ["accommodation","əkɒməˈdeɪʃən","жильё"], ["backpack","ˈbækpæk","рюкзак"]
      ]
    },
    {
      t: "Связки и наречия",
      tip: "although [о:лзо́у] — ough читается [оу]! instead [инстэ́д] — ea как [э].",
      w: [
        ["however","haʊˈevə","однако"], ["although","ɔːlˈðəʊ","хотя"], ["though","ðəʊ","всё же, хотя"], ["therefore","ˈðeəfɔː","поэтому"],
        ["moreover","mɔːrˈəʊvə","более того"], ["besides","bɪˈsaɪdz","кроме того"], ["instead","ɪnˈsted","вместо"], ["despite","dɪˈspaɪt","несмотря на"],
        ["except","ɪkˈsept","кроме"], ["unless","ənˈles","если не"], ["until","ənˈtɪl","пока не"], ["while","waɪl","пока"],
        ["during","ˈdjʊərɪŋ","во время"], ["since","sɪns","с тех пор"], ["already","ɔːlˈredi","уже"], ["still","stɪl","всё ещё"],
        ["yet","jet","ещё (пока нет)"], ["almost","ˈɔːlməʊst","почти"], ["quite","kwaɪt","довольно"], ["rather","ˈrɑːðə","скорее"],
        ["probably","ˈprɒbəbli","вероятно"], ["perhaps","pəˈhæps","возможно"], ["maybe","ˈmeɪbi","может быть"], ["actually","ˈæktʃuəli","на самом деле"],
        ["especially","ɪˈspeʃəli","особенно"], ["exactly","ɪgˈzæktli","точно"]
      ]
    },
    {
      t: "Повседневная жизнь",
      tip: "schedule [ˈшэдью:л] (брит.) или [ˈскэджул] (амер.). decision [дэси́жн] — si читается [ж].",
      w: [
        ["habit","ˈhæbɪt","привычка"], ["routine","ruːˈtiːn","распорядок"], ["schedule","ˈʃedjuːl","расписание"], ["appointment","əˈpɔɪntmənt","запись (на приём)"],
        ["opportunity","ɒpəˈtjuːnəti","возможность"], ["chance","tʃɑːns","шанс"], ["choice","tʃɔɪs","выбор"], ["decision","dɪˈsɪʒən","решение (выбор)"],
        ["purpose","ˈpɜːpəs","назначение, смысл"], ["goal","gəʊl","цель"], ["target","ˈtɑːgɪt","цель (мишень)"], ["plan","plæn","план"],
        ["advice","ədˈvaɪs","совет"], ["suggestion","səˈdʒestʃən","предложение"], ["solution","səˈluːʃən","решение (задачи)"], ["problem","ˈprɒbləm","проблема"],
        ["situation","sɪtʃuˈeɪʃən","ситуация"], ["condition","kənˈdɪʃən","состояние"], ["reason","ˈriːzən","причина"], ["result","rɪˈzʌlt","результат"],
        ["effect","ɪˈfekt","эффект"], ["detail","ˈdiːteɪl","деталь"], ["example","ɪgˈzɑːmpəl","пример"], ["mistake","mɪˈsteɪk","ошибка"],
        ["success","səkˈses","успех"], ["failure","ˈfeɪljə","неудача"]
      ]
    }
  ]
};
