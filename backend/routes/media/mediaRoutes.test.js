import request from "supertest"
import express from "express"
import router  from "./index.js"

const testApp = new express()
testApp.use("/", router)


describe("media routes", function () {

  test('responds to /', async () => {
    const res = await request(testApp).get('/');
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)).toEqual({
        "media": [
            {
                "genre": "action, adventure, sci-fi",
                "id": 2,
                "poster": "https://ia.media-imdb.com/images/M/MV5BMTI2ODMzODA0Ml5BMl5BanBnXkFtZTYwNTM3NzY5._V1._CR17,27,308,447_.jpg",
                "title": "Predator",
                "type": "movie",
                "year": "1987",
            },
            {
                "genre": "action, adventure",
                "id": 1,
                "poster": "https://ia.media-imdb.com/images/M/MV5BMjA0ODEzMTc1Nl5BMl5BanBnXkFtZTcwODM2MjAxNA@@._V1_SY1000_CR0,0,664,1000_AL_.jpg",
                "title": "Raiders of the Lost Ark",
                "type": "movie",
                "year": "1981",
            }
        ],
        "paginationInfo": {
                "currentPage": 1,
                "pageSize": 8, 
                "totalPages": 1,
                "totalRecords": 2,
        },
    });
  });

  test('applies the genres filter', async () => {
    const res = await request(testApp).get('/?genres=sci-fi');
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)).toEqual({
        "media": [
            {
                "genre": "action, adventure, sci-fi",
                "id": 2,
                "poster": "https://ia.media-imdb.com/images/M/MV5BMTI2ODMzODA0Ml5BMl5BanBnXkFtZTYwNTM3NzY5._V1._CR17,27,308,447_.jpg",
                "title": "Predator",
                "type": "movie",
                "year": "1987",
            }
        ],
        "paginationInfo": {
                "currentPage": 1,
                "pageSize": 8, 
                "totalPages": 1,
                "totalRecords": 1,
        },
    });
  });

  test('applies the years filter', async () => {
    const res = await request(testApp).get('/?years=1987');
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)).toEqual({
        "media": [
            {
                "genre": "action, adventure, sci-fi",
                "id": 2,
                "poster": "https://ia.media-imdb.com/images/M/MV5BMTI2ODMzODA0Ml5BMl5BanBnXkFtZTYwNTM3NzY5._V1._CR17,27,308,447_.jpg",
                "title": "Predator",
                "type": "movie",
                "year": "1987",
            }
        ],
        "paginationInfo": {
                "currentPage": 1,
                "pageSize": 8, 
                "totalPages": 1,
                "totalRecords": 1,
        },
    });
  });

  test('applies the years and genres filters together', async () => {
    const res = await request(testApp).get('/?years=1987&genres=adventure');
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)).toEqual({
        "media": [
            {
                "genre": "action, adventure, sci-fi",
                "id": 2,
                "poster": "https://ia.media-imdb.com/images/M/MV5BMTI2ODMzODA0Ml5BMl5BanBnXkFtZTYwNTM3NzY5._V1._CR17,27,308,447_.jpg",
                "title": "Predator",
                "type": "movie",
                "year": "1987",
            }
        ],
        "paginationInfo": {
                "currentPage": 1,
                "pageSize": 8, 
                "totalPages": 1,
                "totalRecords": 1,
        },
    });
  });

  test('applies the search text filter', async () => {
    const res = await request(testApp).get('/?searchText=pred');
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.text)).toEqual({
        "media": [
            {
                "genre": "action, adventure, sci-fi",
                "id": 2,
                "poster": "https://ia.media-imdb.com/images/M/MV5BMTI2ODMzODA0Ml5BMl5BanBnXkFtZTYwNTM3NzY5._V1._CR17,27,308,447_.jpg",
                "title": "Predator",
                "type": "movie",
                "year": "1987",
            }
        ],
        "paginationInfo": {
                "currentPage": 1,
                "pageSize": 8, 
                "totalPages": 1,
                "totalRecords": 1,
        },
    });
  });
});
