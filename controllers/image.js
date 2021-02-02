const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: '20c74c40ee924c9ea8c1658f7782a796',
});

const handleApiCall = () => (req,res) => {
    app.models.predict(Clarifai.FACE_EMBED_MODEL,req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Error"))

}
const handleImage = (db) => (req,res)=>{
    const { id } = req.body;
    db('users').where({id})
        .increment('entries',1)
        .returning('entries')
        .then(response => res.json(response[0]))
        .catch(err => res.status(400).json("Unable to get entries"));
}

module.exports = { handleImage,  handleApiCall }