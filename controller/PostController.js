const Post = require('../model/PostSchema');

const create = async (req, resp) => {
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            image: req.body.image
        });
        await post.save();
        resp.status(201).json({ 'message': 'Post saved!' });
    } catch (error) {
        resp.status(500).json({ 'error': error.message });
    }
};

const findById = async (req, resp) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            resp.status(200).json(post);
        } else {
            resp.status(404).json({ 'message': 'Post not found!' });
        }
    } catch (error) {
        resp.status(500).json({ 'error': error.message });
    }
};

const update = async (req, resp) => {
    try {
        const updateData = await Post.findByIdAndUpdate(req.params.id, {
            $set: {

                content: req.body.content,
                image: req.body.image,
                title: req.body.title

            }
        }, { new: true });

        if (updateData) {
            resp.status(200).json({ 'message': 'Updated' });
        } else {
            resp.status(404).json({ 'message': 'Post not found' });
        }
    } catch (error) {
        resp.status(500).json({ 'error': error.message });
    }
};

const deleteById = async (req, resp) => {
    try {
        const deleteData = await Post.findByIdAndDelete(req.params.id);
        if (deleteData) {
            resp.status(204).json({ 'message': 'Deleted' });
        } else {
            resp.status(404).json({ 'message': 'Post not found' });
        }
    } catch (error) {
        resp.status(500).json({ 'error': error.message });
    }
};
const findAll=(req,resp)=>{
    try{
        const {searchText, page=1, size=10}=req.query;

        const pageNumber=parseInt(page);
        const pageSize=parseInt(size);

        const query ={};
        if(searchText){
            query.$text={$search:searchText}
        }

        const skip= (pageNumber-1) * pageSize;

        Post.find(query)
            .limit(pageSize)
            .skip(skip).then(data=>{
            return resp.status(200).json(data);
        })

    }catch (error){
        return resp.status(500).json({'message':'internal server error'});
    }
}

module.exports = {
    create,
    findById,
    update,
    deleteById,
    findAll
};
