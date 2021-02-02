const handleSignin = (bcrypt,db) => (req,res)=>{
    const {email, password} = req.body;
    db('login').select('*').where({email})
    .then(userlogin => {
        const isValid = bcrypt.compareSync(password,userlogin[0].hash);
        if(isValid){
            db('users').select('*').where({email})
            .returning('*')
            .then(user => {
                res.json(
                    user[0]
                )
            })
        }else{
            res.status(400).json("Wrong password or email");
        }
    })
    .catch(err => res.status(400).json("Wrong password or email"))
}
module.exports = {handleSignin}