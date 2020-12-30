import validateJson from '../esm/validateJson'

test('Works on valid JSON', () => {
    expect.assertions(2)

    return validateJson('{"a": "AAA"}')
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Works on big valid JSON sample', () => {
    expect.assertions(2)

    // this is random data from https://www.json-generator.com/
    const sample = `[
  {
    "_id": "5fca9ef06c5d9127e5d0c03e",
    "index": 0,
    "guid": "cb690f93-be89-4a43-95eb-d5a845c3c33e",
    "isActive": false,
    "balance": "$3,350.07",
    "picture": "http://placehold.it/32x32",
    "age": 23,
    "eyeColor": "blue",
    "name": "Landry Fuentes",
    "gender": "male",
    "company": "KROG",
    "email": "landryfuentes@krog.com",
    "phone": "+1 (896) 451-2740",
    "address": "964 Rock Street, Malo, Colorado, 4604",
    "about": "Minim ad occaecat dolor tempor qui aliqua eiusmod ea. Consectetur consequat laborum officia elit velit nostrud ipsum deserunt ullamco sunt et. Irure officia aute eiusmod nisi mollit ut veniam et. Sunt sit velit labore incididunt labore cupidatat aliqua sit magna eiusmod ad fugiat qui qui. Qui mollit eu tempor labore ea officia incididunt est cupidatat.\\r\\n",
    "registered": "2014-07-23T03:11:25 +07:00",
    "latitude": -75.263082,
    "longitude": 160.642646,
    "tags": [
      "irure",
      "amet",
      "aliquip",
      "id",
      "ea",
      "do",
      "irure"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Young Callahan"
      },
      {
        "id": 1,
        "name": "Beach Forbes"
      },
      {
        "id": 2,
        "name": "Katheryn Harrington"
      }
    ],
    "greeting": "Hello, Landry Fuentes! You have 2 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5fca9ef0d205deeea0bd172b",
    "index": 1,
    "guid": "7759e479-2ee4-4dc1-bd01-67d3d3ed4d57",
    "isActive": true,
    "balance": "$1,884.67",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "blue",
    "name": "Tyson Oneal",
    "gender": "male",
    "company": "MIRACULA",
    "email": "tysononeal@miracula.com",
    "phone": "+1 (881) 515-2525",
    "address": "818 Jaffray Street, Townsend, Puerto Rico, 5877",
    "about": "Reprehenderit eu anim et do ex adipisicing anim velit ullamco sunt reprehenderit. In amet aliquip non est. Proident mollit tempor tempor esse adipisicing cillum. Officia pariatur veniam officia reprehenderit nisi do irure pariatur. Fugiat labore nostrud in consequat culpa cupidatat cupidatat qui aliqua voluptate veniam sint.\\r\\n",
    "registered": "2018-07-27T05:19:36 +07:00",
    "latitude": -69.414339,
    "longitude": 7.59744,
    "tags": [
      "consectetur",
      "nostrud",
      "sint",
      "est",
      "nisi",
      "ipsum",
      "culpa"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Francine Charles"
      },
      {
        "id": 1,
        "name": "Taylor Glenn"
      },
      {
        "id": 2,
        "name": "Carolyn Gordon"
      }
    ],
    "greeting": "Hello, Tyson Oneal! You have 1 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5fca9ef0b2631aee81a2b79d",
    "index": 2,
    "guid": "a3d22360-5cfe-4bbc-9d82-a53371c49585",
    "isActive": true,
    "balance": "$1,927.25",
    "picture": "http://placehold.it/32x32",
    "age": 33,
    "eyeColor": "brown",
    "name": "Silva Wolfe",
    "gender": "male",
    "company": "AQUACINE",
    "email": "silvawolfe@aquacine.com",
    "phone": "+1 (827) 422-2039",
    "address": "464 Nassau Avenue, Waterford, Hawaii, 4721",
    "about": "Sint laborum officia laborum pariatur officia qui. Qui quis cillum cillum exercitation enim tempor excepteur ut reprehenderit Lorem amet. Qui qui deserunt id do.\\r\\n",
    "registered": "2016-03-06T11:24:45 +08:00",
    "latitude": 70.90558,
    "longitude": 30.961495,
    "tags": [
      "sunt",
      "officia",
      "excepteur",
      "nulla",
      "aute",
      "ut",
      "magna"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Elliott Gonzalez"
      },
      {
        "id": 1,
        "name": "Wolfe Mclaughlin"
      },
      {
        "id": 2,
        "name": "Everett Holt"
      }
    ],
    "greeting": "Hello, Silva Wolfe! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5fca9ef03a2584c7aae85b6e",
    "index": 3,
    "guid": "64db3a2f-d49f-4dfa-8745-81abc087ad82",
    "isActive": true,
    "balance": "$2,301.01",
    "picture": "http://placehold.it/32x32",
    "age": 22,
    "eyeColor": "green",
    "name": "Fowler York",
    "gender": "male",
    "company": "NORALI",
    "email": "fowleryork@norali.com",
    "phone": "+1 (971) 514-3204",
    "address": "557 Rose Street, Newcastle, New York, 2859",
    "about": "Culpa quis ad nostrud esse enim. Aliquip non aute qui consectetur consequat sunt. Culpa adipisicing aliquip commodo est in cupidatat proident reprehenderit ad aute dolor.\\r\\n",
    "registered": "2017-09-22T11:08:01 +07:00",
    "latitude": -31.449204,
    "longitude": 32.162917,
    "tags": [
      "esse",
      "anim",
      "veniam",
      "enim",
      "proident",
      "adipisicing",
      "commodo"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Cornelia Conway"
      },
      {
        "id": 1,
        "name": "Estella Baird"
      },
      {
        "id": 2,
        "name": "Cain Garner"
      }
    ],
    "greeting": "Hello, Fowler York! You have 2 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5fca9ef0986ed6b1c63a3967",
    "index": 4,
    "guid": "d4f24e90-97d7-4af7-8259-6437f67282e3",
    "isActive": true,
    "balance": "$2,818.76",
    "picture": "http://placehold.it/32x32",
    "age": 34,
    "eyeColor": "blue",
    "name": "Georgina Walter",
    "gender": "female",
    "company": "ISOLOGIX",
    "email": "georginawalter@isologix.com",
    "phone": "+1 (941) 566-3906",
    "address": "495 Lincoln Place, Fedora, Pennsylvania, 6331",
    "about": "Amet esse minim pariatur id eiusmod qui aliquip mollit ea. Incididunt sit veniam consectetur dolor et excepteur tempor anim nulla Lorem. Enim duis minim culpa do Lorem id duis consequat sit. Enim labore quis tempor anim esse sunt sunt. Elit deserunt fugiat labore incididunt dolore commodo est incididunt proident et. Irure amet adipisicing anim officia amet consectetur anim esse dolor labore aliquip. Dolore aliquip dolor ad qui duis tempor id reprehenderit laborum aliqua do nostrud deserunt.\\r\\n",
    "registered": "2014-02-24T02:57:56 +08:00",
    "latitude": 18.968103,
    "longitude": -22.686685,
    "tags": [
      "velit",
      "consequat",
      "veniam",
      "culpa",
      "ullamco",
      "aute",
      "officia"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Adeline Mosley"
      },
      {
        "id": 1,
        "name": "Caldwell Becker"
      },
      {
        "id": 2,
        "name": "Aurora Bryan"
      }
    ],
    "greeting": "Hello, Georgina Walter! You have 1 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5fca9ef0c7e4898164d0b188",
    "index": 5,
    "guid": "02e294c5-11fb-4e78-897b-d40595a68872",
    "isActive": true,
    "balance": "$1,608.68",
    "picture": "http://placehold.it/32x32",
    "age": 40,
    "eyeColor": "brown",
    "name": "Schneider Jordan",
    "gender": "male",
    "company": "PYRAMIS",
    "email": "schneiderjordan@pyramis.com",
    "phone": "+1 (849) 529-2490",
    "address": "820 Dwight Street, Ruckersville, Nebraska, 1574",
    "about": "In non eiusmod voluptate culpa. Eiusmod excepteur ullamco pariatur non consectetur minim dolor consequat. Sit sunt laborum aliquip est anim ipsum amet nulla anim eu sunt sunt esse. Reprehenderit reprehenderit eiusmod id aliquip. Et tempor quis irure nostrud cupidatat culpa. Do nostrud dolor enim laborum exercitation ex qui. Fugiat id aliqua ad sit ipsum ea ea elit reprehenderit.\\r\\n",
    "registered": "2015-04-19T08:36:57 +07:00",
    "latitude": -68.469182,
    "longitude": 158.397092,
    "tags": [
      "est",
      "proident",
      "laboris",
      "culpa",
      "cupidatat",
      "ad",
      "voluptate"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Alston Vang"
      },
      {
        "id": 1,
        "name": "Hawkins Maddox"
      },
      {
        "id": 2,
        "name": "Annabelle Ellison"
      }
    ],
    "greeting": "Hello, Schneider Jordan! You have 5 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5fca9ef0e787692ee9b5749d",
    "index": 6,
    "guid": "3158d41c-f257-4771-bc39-1c71a34e3a77",
    "isActive": false,
    "balance": "$3,136.48",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "blue",
    "name": "Sloan Rivas",
    "gender": "male",
    "company": "AMTAP",
    "email": "sloanrivas@amtap.com",
    "phone": "+1 (890) 453-2411",
    "address": "725 Wyckoff Street, Berwind, Kentucky, 3943",
    "about": "Quis cupidatat veniam pariatur dolore nisi est ipsum amet. Veniam quis velit ex culpa consectetur laborum incididunt et quis minim eu. Nisi tempor consectetur mollit aliqua. Incididunt cillum laborum ex duis quis in occaecat.\\r\\n",
    "registered": "2020-01-19T06:28:53 +08:00",
    "latitude": -61.374817,
    "longitude": 1.372624,
    "tags": [
      "velit",
      "officia",
      "et",
      "sit",
      "quis",
      "deserunt",
      "exercitation"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Adela Blake"
      },
      {
        "id": 1,
        "name": "Stefanie Long"
      },
      {
        "id": 2,
        "name": "Flores Vincent"
      }
    ],
    "greeting": "Hello, Sloan Rivas! You have 6 unread messages.",
    "favoriteFruit": "strawberry"
  }
]`

    return validateJson(sample)
        .then(x => {
            expect(x.isValid).toBe(true)
            expect(x.messages.length).toBe(0)
        })
})

test('Shows invalid JSON.', () => {
    expect.assertions(3 * 4)

    const expectError = p => p.then(x => {
        expect(x.isValid).toBe(false)
        expect(x.messages.length).toBe(1)
        expect(x.messages.filter(x => x.code === 'not-json').length).toBe(1)
    })

    return Promise.all([
        expectError(validateJson('{"a": "aaa"')),
        expectError(validateJson('"a": "aaa"')),
        expectError(validateJson('"a": "aaa"}')),
        expectError(validateJson("'a'")),
    ])
})
