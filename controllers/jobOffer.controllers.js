const Offer = require("../models/jobOffer.models");
require ('dotenv').config
const fs=require('fs')
const User=require('../models/user.models')
const Field = require('../models/field.models')
const Comment=require('../models/comments.models')
// const fileUploadmiddleware=require('../middleware/fileUpload');
const { isEmpty } = require("../config/custom.config");
const { default: mongoose } = require("mongoose");



exports.add = async (req, res) => {
    const blogpost = Offer({
        username:req.decoded.username,
         fields:req.body.fields,
        title:req.body.title,
         description:req.body.description,
         placesAvai:req.body.placesAvai,
         qualifications:req.body.qualifications,
        technologiesReq:req.body.technologiesReq,
          diplomaReq:req.body.diplomaReq,
         jobType:req.body.jobType,
        region:req.body.region,
        // image:image_file_name
      });
      blogpost
        .save()
        .then((result) => {
          res.json({ data: result["_id"] });
        })
        .catch((err) => {
          console.log(err), res.json({ err: err });
        });
}
    
        

exports.findAllOffers = async(req, res) => {

   

    try{
		
		let query=[
			{
				$lookup:
				{
				 from: "companyres",
				 localField: "company",
				 foreignField: "_id",
				 as: "creator"
				}
			},
			{$unwind: '$creator'},
			{
				$lookup:
				{
				 from: "fields",
				 localField: "fields",
				 foreignField: "_id",
				 as: "category_details"
				}
			},
			{$unwind: '$category_details'},
		];

		if(req.query.keyword && req.query.keyword!=''){ 
			query.push({
			  $match: { 
			    $or :[
			      {
			        title : { $regex: req.query.keyword } 
			      },
			      {
			        'category_details.name' : { $regex: req.query.keyword } 
			      },
			      {
			        'creator.email' : { $regex: req.query.keyword } 
			      }
			    ]
			  }
			});
		}

		if(req.query.fields){		
			query.push({
			    $match: { 
			    	'category_details.name':req.query.fields,
			    }	
			});
		}

		if(req.query.company){		
			query.push({
			    $match: { 
			    	company:mongoose.Types.ObjectId(req.query.company_id),
			    }	
			});
		}

		let total=await Offer.countDocuments(query);
		let page=(req.query.page)?parseInt(req.query.page):1;
		let perPage=(req.query.perPage)?parseInt(req.query.perPage):10;
		let skip=(page-1)*perPage;
		query.push({
			$skip:skip,
		});
		query.push({
			$limit:perPage,
		});

		query.push(
	    	{ 
	    		$project : {
                    "_id":1,
                    "created_at":1,
                    "title":1,
                    "description":1,
                    "image":1,
                    "category_details.name":1,
                    "category_details._id":1,
                    "creator.email":1,
                    "creator.username":1,
                    "qualifications":1,
                    "technologiesReq":1,
                    "jobType":1,
                    "placesAvai":1,
                    "diplomaReq":1,
                    "region":1,
                    "expirationDate":1,
                    "candidacy_count":{$size:{"$ifNull":["$candidacy",[]]}},
                    "comments_count":{$size:{"$ifNull":["$comments",[]]}}
	    		} 
	    	}
	    );
	    if(req.query.sortBy && req.query.sortOrder){
			var sort = {};
			sort[req.query.sortBy] = (req.query.sortOrder=='asc')?1:-1;
			query.push({
				$sort: sort
			});
		}else{
			query.push({
				$sort: {created_at:-1}
			});	
		}

		let blogs=await Offer.aggregate(query);
		return res.send({
	  		message:'job Offers successfully fetched',
	  		data:{
	  			blogs:blogs.map(doc => Offer.hydrate(doc)),
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



exports.findById = async(req, res) => {
    try{

		let offer=req.params.offer;

		if(!mongoose.Types.ObjectId.isValid(offer)){
			return res.status(400).send({
		  		message:'Invalid blog id',
		  		data:{}
		  	});
		}
		let query=[
			{
				$lookup:
				{
				 from: "companyres",
				 localField: "company",
				 foreignField: "_id",
				 as: "creator"
				}
			},
			{$unwind: '$creator'},
			{
				$lookup:
				{
				 from: "fields",
				 localField: "fields",
				 foreignField: "_id",
				 as: "category_details"
				}
			},
			{$unwind: '$category_details'},
			{
				$match:{
					'_id':mongoose.Types.ObjectId(offer)
				}
			},
			{ 
	    		$project : {
                    "_id":1,
                    "created_at":1,
                    "title":1,
                    "description":1,
                    "image":1,
                    "category_details.name":1,
                    "category_details._id":1,
                    "creator.email":1,
                    "creator.username":1,
                    "qualifications":1,
                    "technologiesReq":1,
                    "jobType":1,
                    "placesAvai":1,
                    "diplomaReq":1,
                    "region":1,
                    "expirationDate":1,
                    "candidacy_count":{$size:{"$ifNull":["$candidacy",[]]}},
                    "comments_count":{$size:{"$ifNull":["$comments",[]]}}
	    		} 
	    	}
		];

		let blogs=await Offer.aggregate(query);

		if(blogs.length>0){
			let blog=blogs[0];
			let current_user=req.company;
			
			
			return res.status(200).send({
				message:'Blog successfully fetched',
				data:{
					blog:Offer.hydrate(blog) }
					
			});
		}else{
			return res.status(400).send({
				message:'No blog found',
				data:{}
			});	
		}



	}catch(err){
		return res.status(400).send({
	  		message:err.message,
	  		data:err
	  	});
	}
}
    


exports.delete = (req, res) => {
    let offer=req.params.offer;
	if(!mongoose.Types.ObjectId.isValid(offer)){
		return res.status(400).send({
	  		message:'Invalid job offer id',
	  		data:{}
	  	});
	}

	Offer.findOne({_id:offer}).then(async (offer)=>{
		if(!offer){
			return res.status(400).send({
		  		message:'No job offer found',
		  		data:{}
		  	});
		}else{
			let current_user=req.company;
			if(offer.company!=current_user._id){
				return res.status(400).send({
			  		message:'Access denied',
			  		data:{}
			  	});
			}else{

				let old_path=publicPath+'/uploads/blog_images/'+blog.image;
				if(fs.existsSync(old_path)){
					fs.unlinkSync(old_path);
				}

				await Offer.deleteOne({_id:offer_id});
				return res.status(200).send({
			  		message:'Blog successfully deleted',
			  		data:{}
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
exports.update = (req, res) => {
    let offer=req.params.offer;
	if(!mongoose.Types.ObjectId.isValid(offer)){
		return res.status(400).send({
	  		message:'Invalid offer id',
	  		data:{}
	  	});
	}
	Offer.findOne({_id:offer}).then(async(offer)=>{
		if(!offer){
			return res.status(400).send({
		  		message:'No blog found',
		  		data:{}
		  	});
		}else{
			let current_user=req.company;

			if(offer.company!=current_user._id){
				return res.status(400).send({
			  		message:'Access denied',
			  		data:{}
			  	});
			}else{

				try{
					
					
					

				    if(req.files && req.files.image){
			            var image_file= req.files.image;
			            var image_file_name=Date.now()+'-blog-image-'+image_file.name;
			            var image_path=publicPath+'/uploads/blog_images/'+image_file_name;
			            await image_file.mv(image_path);

			            let old_path=publicPath+'/uploads/blog_images/'+offer.image;
			            if(fs.existsSync(old_path)){
			            	fs.unlinkSync(old_path);
			            }

					}else{
						var image_file_name=offer.image;
					}


					await Offer.updateOne({_id:offer},{
				  	    company:req.company._id,
                        fields:req.body.fields,
                        title:req.body.title,
                        description:req.body.description,
                        placesAvai:req.body.placesAvai,
                        qualifications:req.body.qualifications,
                        technologiesReq:req.body.technologiesReq,
                        diplomaReq:req.body.diplomaReq,
                        jobType:req.body.jobType,
                        region:req.body.region,
                        image:image_file_name
					});



					let query=[
					{
						$lookup:
						{
						 from: "companyres",
						 localField: "company",
						 foreignField: "_id",
						 as: "creator"
						}
					},
					{$unwind: '$creator'},
					{
						$lookup:
						{
						 from: "fields",
						 localField: "fields",
						 foreignField: "_id",
						 as: "category_details"
						}
					},
					{$unwind: '$category_details'},
					{
						$match:{
							'_id':mongoose.Types.ObjectId(offer)
						}
					},
					{ 
			    		$project : {
                            "_id":1,
                            "created_at":1,
                            "title":1,
                            "description":1,
                            "image":1,
                            "category_details.name":1,
                            "category_details._id":1,
                            "creator.email":1,
                            "creator.username":1,
                            "qualifications":1,
                            "technologiesReq":1,
                            "jobType":1,
                            "placesAvai":1,
                            "diplomaReq":1,
                            "region":1,
                            "expirationDate":1,
                            "candidacy_count":{$size:{"$ifNull":["$candidacy",[]]}},
                            "comments_count":{$size:{"$ifNull":["$comments",[]]}}
			    		} 
			    	}
				];

				let blogs=await Offer.aggregate(query);
			  	return res.status(200).send({
			  		message:'Blog successfully updated',
			  		data:Offer.hydrate(blogs[0]) 
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
exports.getbyname =async(req,res)=>{
    let data= await Offer.find( {
        "$or":[
            {title:{$regex:req.params.key}},
            // {fields:{$regex:req.params.key}},
            {technologiesReq:{$regex:req.params.key}}
        ]
    })
    res.status(200).send(data)
}


    





