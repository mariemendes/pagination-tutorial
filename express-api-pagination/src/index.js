const express = require('express')
const cors = require('cors')
const { createConnection, getRepository } = require('typeorm');
const connectionOptions = require('./database/connectionOptions');
const BookEntity = require('./database/entities/booksEntity');
const app = express();
const PORT = process.env.PORT || 6004;

app.use(cors({
  origin: 'http://localhost:3001'
}))

app.get('/api/books', async (req, res) =>{
  //page, count
  const { count, page} = req.query;
  if(!count || !page) 
    return res.status(400).send({error: 'Missing Query Parameters' });

  //when count e page is not a number.
  const countInt = parseInt(count);
  const pageInt = parseInt(page);
  const offset = pageInt * countInt;
  if(isNaN(countInt) || isNaN(pageInt))
    return res.status(400).send({error: 'Invalid Value for Query Parameters' });

  if(countInt< 0 || pageInt < 0)
    return res.status(400).send({error: 'Query Value cannot conatin negative value!' });
  const repository = getRepository(BookEntity);
  const [results, total] = await repository.findAndCount({
    //offset
    skip: offset,
    //max entities
    take: countInt 
  });
    res.send({results, total
    });
})

app.get('/api/cars', (req, res) =>{
    res.send(200);
})


async function main (){
  try{
    await createConnection(connectionOptions)
    app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}

main();