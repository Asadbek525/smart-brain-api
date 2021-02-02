const handleProfile = (db) => (req,res)=>{
    const id= req.params.id;
    db.select('*').from('users').where({id})
        .then(user => {
            if(user.length)
                res.json(user[0]);
            else {
                res.status(400).json("Not Found");
            }
        })
        .catch(err => res.status(400).json("ERRORRRRRRRR"))
}
module.exports = {handleProfile}