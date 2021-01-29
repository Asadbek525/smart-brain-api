const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');


const app = express();
let id = 1001;
const database ={

    users:[
        {
            id:1000,
            name:'Asadbek',
            email:'asadbek@gmail.com',
            entries:0,
            joined:new Date(),
        }
            
        ],
    login:[
       {
           id:1000,
           email:'asadbek@gmail.com',
           hash:''

       }
    ]
}

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
/**
 * Home Page
 */
app.get('/',(req,res)=>{
    res.json(database.users);}
);

/**
 * Sign In Page
 */
app.post('/signin',(req,res)=>{
    let found = false;
    let i=0;
    const {email,password} = req.body;
    database.login.forEach(login => {
        if(login.email === email){
            found = true;
            if(bcrypt.compareSync(password,login.hash)){
                return res.status(200).json(database.users[i]);
            }
            else{
                return res.status(400).json("wrong password");
            }
        }
        i++;
    })

    if(!found){
        return res.status(404).json("User not found");
    }
   

});
/**
 * Register page
 */
app.post('/register', async (req,res)=>{
    const {name,password,email} = req.body;
    const newUser = {
        id:++id,
        name:name,
        email:email,
        entries:0,
        joined: new Date()
    }
    const newLogin = {
        id:id,
        hash:'',
        email:email
    }
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    newLogin.hash = hash;
    database.users.push(newUser);
    database.login.push(newLogin);
    res.json(newUser);
});

/**
 * Profile route    
 */

app.get('/profile/:id',(req,res)=>{
    const id1= req.params.id;
    let found = false
    database.users.forEach(user => {
        if(user.id == id1){
            found = true
            return res.json(user);
        }

    })
    if(!found) return res.status(404).json("Not Found");
})

/**
 * Image entries
 */

app.put('/image',(req,res)=>{
    const { id } = req.body;
    let found = false
    database.users.forEach(user => {
        if(user.id == id){
            found = true
            user.entries+=1;
            res.json(user.entries)
        }

    })
    if(!found) return res.status(404).json("Not Found");
})

app.listen(3000,()=>{
    console.log("app is listening on port 3000");
})