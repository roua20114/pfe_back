
const Comments = require('../models/comments.models')
const Offer= require ('../models/jobOffer.models')
exports.createCom= async(req,res)=>{
    let offer=req.params.offer;
	if(!mongoose.Types.ObjectId.isValid(offer)){
		return res.status(400).send({
	  		message:'Invalid blog id',
	  		data:{}
	  	});
	}
	Offer.findOne({_id:offer}).then(async (offer)=>{
		if(!offer){
			return res.status(400).send({
				message:'No blog found',
				data:{}
			});	
		}else{

			try{
			

				let newCommentDocument= new Comments({
					content:req.body.content,
					offer:offer,
					candidat:req.candidat._id
				});

				let commentData=await newCommentDocument.save();

				await Offer.updateOne(
					{_id:offer},
					{
						$push: { comments:commentData._id  } 
					}
				)


				let query=[
					{
						$lookup:
						{
						 from: "candidats",
						 localField: "candidat",
						 foreignField: "_id",
						 as: "candidat"
						}
					},
					{$unwind: '$candidat'},
					{
						$match:{
							'_id':mongoose.Types.ObjectId(commentData._id)
						}
					},

				];

				let comments=await Comments.aggregate(query);

				return res.status(200).send({
					message:'Comment successfully added',
					data:comments[0]
				});


			}catch(err){
				return res.status(400).send({
			  		message:err.message,
			  		data:err
			  	});
			}

		
		}
	}).catch((err)=>{
		return res.status(400).send({
	  		message:err.message,
	  		data:err
	  	});
	})

    
}



exports.findAllComs=(req,res)=>{
    let offer=req.params.offer;
	if(!mongoose.Types.ObjectId.isValid(offer)){
		return res.status(400).send({
	  		message:'Invalid blog id',
	  		data:{}
	  	});
	}

	Offer.findOne({_id:offer}).then(async (blog)=>{
		if(!blog){
			return res.status(400).send({
				message:'No blog found',
				data:{}
			});	
		}else{

			try{
				let query=[
					{
						$lookup:
						{
						 from: "users",
						 localField: "user_id",
						 foreignField: "_id",
						 as: "user"
						}
					},
					{$unwind: '$user'},
					{
						$match:{
							'blog_id':mongoose.Types.ObjectId(offer)
						}
					},
					{
						$sort:{
							createdAt:-1
						}
					}
				];

				let total=await Comments.countDocuments(query);
				let page=(req.query.page)?parseInt(req.query.page):1;
				let perPage=(req.query.perPage)?parseInt(req.query.perPage):10;
				let skip=(page-1)*perPage;
				query.push({
					$skip:skip,
				});
				query.push({
					$limit:perPage,
				});

				let comments=await Comments.aggregate(query);
				return res.send({
		  		    message:'Comment successfully fetched',
			  		data:{
			  			comments:comments,
			  			meta:{
			  				total:total,
			  				currentPage:page,
			  				perPage:perPage,
			  				totalPages:Math.ceil(total/perPage)
		  			    }
			  		}
		  	    });

			}catch(err){
				return res.status(400).send({
			  		message:err.message,
			  		data:err
			  	});
			}



		}
	}).catch((err)=>{
		return res.status(400).send({
	  		message:err.message,
	  		data:err
	  	});
	})	


}
exports.findById=(req,res)=>{
    Comments.findById(req.params.id).then((coments)=>{
        if(!coments){
           return res.status(404).send({message:"coudln't find comment"}) 
        }
        res.send(coments)

    }).catch((err)=>{
        if(err.kind==='objectId'){
            return res.status(404).send({message:"Error" +req.params.id})
        }
        res.status(500).send({message:"error"});

    })
}
exports.delete=(req,res)=>{
    let comment_id=req.params.comment_id;
	if(!mongoose.Types.ObjectId.isValid(comment_id)){
		return res.status(400).send({
	  		message:'Invalid comment id',
	  		data:{}
	  	});
	}

	Comments.findOne({_id:comment_id}).then(async (comment)=>{
		if(!comment){
			return res.status(400).send({
				message:'No comment found',
				data:{}
			});	
		}else{

			let current_user=req.company;

			if(comment.company_id!=current_user._id){
				return res.status(400).send({
					message:'Access denied',
					data:{}
				});	
			}else{
				try{
					await Comments.deleteOne({_id:comment_id})
					await Offer.updateOne(
						{_id:comment.offer},
						{
							$pull:{comments:comment_id}
						}
					)

					return res.status(200).send({
						message:'Comment successfully deleted',
						data:{}
					});	
				}catch(err){
					return res.status(400).send({
				  		message:err.message,
				  		data:err
				  	});
				}


				
			}

		}
	}).catch((err)=>{
		return res.status(400).send({
	  		message:err.message,
	  		data:err
	  	});
	})

}
exports.update=(req,res)=>{
    let comment_id=req.params.comment_id;
	if(!mongoose.Types.ObjectId.isValid(comment_id)){
		return res.status(400).send({
	  		message:'Invalid comment id',
	  		data:{}
	  	});
	}

	Comments.findOne({_id:comment_id}).then(async (comment)=>{
		if(!comment){
			return res.status(400).send({
				message:'No comment found',
				data:{}
			});	
		}else{

			let current_user=req.company;

			if(comment.user_id!=current_user._id){
				return res.status(400).send({
					message:'Access denied',
					data:{}
				});	
			}else{

				try{
				
				

					await Comments.updateOne({_id:comment_id},{
						content:req.body.content
					});


					let query=[
						{
							$lookup:
							{
							 from: "companyres",
							 localField: "company",
							 foreignField: "_id",
							 as: "user"
							}
						},
						{$unwind: '$user'},
						{
							$match:{
								'_id':mongoose.Types.ObjectId(comment_id)
							}
						},

					];

					let comments=await Comments.aggregate(query);

					return res.status(200).send({
						message:'Comment successfully updated',
						data:comments[0]
					});


				}catch(err){
					return res.status(400).send({
				  		message:err.message,
				  		data:err
				  	});
				}

				
			}




		}
	}).catch((err)=>{
		return res.status(400).send({
	  		message:err.message,
	  		data:err
	  	});
	})


    }