(function(){
	var module = angular.module("newsModule",[]);
	module.run(function() {
	    AV.initialize("5e98i580j085yqa1btnglpq7gykootafi3pwh5q6ldwis3v8", "sey2myyu3qomi0olprmb9of9xi24poigge0pw33sas8qzyyb");
	});
	module.controller("newsCtrl",['$http', '$scope', function($http, $scope){
		var News = AV.Object.extend("msg");
		$scope.newsArray = [];
	  $scope.newItem = {content:''};
	  $scope.editTempItem={};

	  $scope.getItems = function() {
	  	var query = new AV.Query(News);
	  	query.find({
	  		success:function (results){
	  			$scope.$apply(function(){
	  				$scope.newsArray = JSON.parse(JSON.stringify(results));
	  			})
	  		}
	  	})
	  };


	  $scope.addItem = function () {
	  	var news = new News();
		news.set('content',$scope.newItem.content);
	  	//news.set('datetime',$scope.newItem.news_url);
		  //news.set('image_url',$scope.newItem.image_url);
		news.save(null,{
			success:function(result){
				$scope.$apply(function(){
					$scope.newsArray.push(news.toJSON());
					$scope.newItem={content:''};
					alert("新增成功");
				})
			}
		});
	  };

		$scope.deleteItem=function(newsParam){
			//var News = AV.Object.extend("News");
			var news=new News();
			news.set("objectId",newsParam.objectId);
			news.destroy({
				success: function(news){
					$scope.$apply(function(){
						alert("删除成功");
						$scope.newsArray.splice($scope.newsArray.indexOf(newsParam),1);
					})
				},
				error:function(news,error){
					console.error("fail delete");
				}
			});
		};

		//$scope.editTemp=function(itemParam){
		//	$scope.editTempItem=itemParam;
		//};
        //
		//$scope.editItem=function(){
		//	//var News =AV.Object.extend("News");
		//	//$scope.editTempItem.save
		//	var news = new News();
		//	news.set("objectId",$scope.editTempItem.objectId);
		//	news.set('news_desc',$scope.editTempItem.news_desc);
		//	news.set('news_url',$scope.editTempItem.news_url);
		//	news.set('image_url',$scope.editTempItem.image_url);
        //
		//	news.save(null,{
		//		success:function(news){
		//			alert("编辑成功");
		//			$('#myModal').modal('hide');
		//			console.error("success Edit")
		//		},
		//		error:function(news){
		//			console.error("fail edit");
		//		}
		//	});
		//};
        //
		//$scope.denyCar=function(itemParam){
        //
		//};

    $scope.getItems();

	}]);
	module.controller('ClassCtrl', function($scope) {
		var Subject=AV.Object.extend("subject");
		var CategorySubject=AV.Object.extend("category_subject");
		var Category=AV.Object.extend("category");
		var UserSubject=AV.Object.extend("user_subject");

		$scope.subjectArray = [];
		$scope.subjectTemp = {};
		$scope.selected={};
		$scope.subjectCountArray={};

		$scope.categorySubjectArray =[];

		$scope.categoryArray = [];

		$scope.getCountSubject = function() {
			var query = new AV.Query(Subject);
			query.greaterThan("count",0);
			query.find({
				success:function (results){
					$scope.$apply(function(){
						$scope.subjectCountArray = JSON.parse(JSON.stringify(results));
					})
				}
			})
		};
		$scope.cancelSubject = function(itemParam) {
			var query = new AV.Query(Subject);
			query.get(itemParam.objectId, {
				success: function(post) {
					post.set('count',0);
					post.save();
					alert("取消报名成功");
					$scope.$apply(function(){
						$scope.subjectCountArray.splice($scope.subjectCountArray.indexOf(itemParam),1);
					})
					var q=new AV.Query(UserSubject);
					q.equalTo("subject_id",itemParam.objectId);
					q.destroyAll({
						success:function(){

						},
						error:function(error){

						}
					});
				},
				error: function(error) {
					throw 'Got an error ' + error.code + ' : ' + error.message;
				}
			});
		}


		$scope.getCategorySubject = function() {
			var query = new AV.Query(CategorySubject);
			query.find({
				success:function (results){
					$scope.$apply(function(){
						$scope.categorySubjectArray = JSON.parse(JSON.stringify(results));
					})
				}
			})
		};

		$scope.getCategory = function() {
			var query = new AV.Query(Category);
			query.find({
				success:function (results){
					$scope.$apply(function(){
						$scope.CategoryArray = JSON.parse(JSON.stringify(results));
					})
				}
			})
		};

		$scope.getSubject = function() {
			var query = new AV.Query(Subject);
			query.find({
				success:function (results){
					$scope.$apply(function(){
						$scope.subjectArray = JSON.parse(JSON.stringify(results));
					})
				}
			})
		};

		$scope.addSubject = function () {
			var subject = new Subject();
			subject.set('teacher',$scope.subjectTemp.teacher);
			subject.set('place',$scope.subjectTemp.place);
			subject.set('categorysubject_id',$scope.selected.objectId);
			subject.set('course_arrangement',$scope.subjectTemp.course_arrangement);
			subject.set('schooltime',$scope.subjectTemp.schooltime);
			subject.set('teacher_description',$scope.subjectTemp.teacher_description);
			subject.save(null,{
				success:function(result){
					$scope.$apply(function(){
						$scope.subjectArray.push(subject.toJSON());
						$scope.subjectTemp={};
						alert("新增成功");
					})
				}
			});
		};

		$scope.deleteSubject=function(itemParam){
			var subject = new Subject();
			subject.set("objectId",itemParam.objectId);
			subject.destroy({
				success: function(){
					$scope.$apply(function(){
						alert("删除成功");
						$scope.subjectArray.splice($scope.subjectArray.indexOf(itemParam),1);
					})
				},
				error:function(){
					console.error("fail delete");
				}
			});
		};


		$scope.deleteCategorySubject=function(itemParam){
			var CategorySubject = new CategorySubject();
			CategorySubject.set("objectId",itemParam.objectId);
			CategorySubject.destroy({
				success: function(){
					$scope.$apply(function(){
						alert("删除成功");
						$scope.CategorySubjectArray.splice($scope.CategorySubjectArray.indexOf(itemParam),1);
					})
				},
				error:function(){
					console.error("fail delete");
				}
			});
		};

		$scope.test=function(itemParam){
			console.error("Hello");
		}
		$scope.getCategorySubject();
		$scope.getSubject();
		$scope.getCountSubject();
	})


})();