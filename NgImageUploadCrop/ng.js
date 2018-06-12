var app = angular.module('myapp', ['ngImgCrop']);

app.directive('fileDropzone', function() {
  return {
    restrict: 'A',
    scope: {
      file: '=',
      fileName: '='
    },

    templateUrl: 'ddcct.html',

    controller: function($scope) {
      $scope.image = null;

      $scope.imageFileName = ''
      $scope.myCroppedImage1 = '';
      $scope.myCroppedImage = '';
      $scope.showText = true;
      $scope.myValue = '';

      $scope.$watch(
        function watchfiles() {
          // Return the "result" of the watch expression.
          return ($scope.myValue);
        },
        function handleFileChange(newValue, oldValue) {
          //console.log("fn( $scope.myValue):", newValue);
          //console.log($scope.myValue);
        }
      );


      $scope.$watch(
        function watchfiles() {
          // Return the "result" of the watch expression.
          return ($scope.image);
        },
        function handleFileChange(newValue, oldValue) {
          //console.log("fn( $scope.image):", newValue);
          //console.log($scope.image);
        }
      );

      $scope.$watch(
        function watchfiles() {
          // Return the "result" of the watch expression.
          return ($scope.file);
        },
        function handleFileChange(newValue, oldValue) {
          //console.log("fn( $scope.file):", newValue);
          //console.log($scope.file);
        }
      );

      $scope.$watch(
        function watchfiles() {
          // Return the "result" of the watch expression.
          return ($scope.myCroppedImage);
        },
        function handleFileChange(newValue, oldValue) {

          //console.log("fn( $scope.myCroppedImage):", newValue);
          // console.log($scope.myCroppedImage);
        }
      );

      //console.log( $scope.myValue);

    },

    link: function(scope, element, attrs) {
      var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes;


      processDragOverOrEnter = function(event) {

        console.log('Over and Enter');
        if (event != null) {
          event.preventDefault();
        }
        event.dataTransfer.effectAllowed = 'copy';

        return false;

        var modal = document.getElementById("display").style.display = "block";

        console.log(modal);
      };

      validMimeTypes = attrs.fileDropzone;
      checkSize = function(size) {
        var _ref;
        if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
          return true;
        } else {
          alert("File must be smaller than " + attrs.maxFileSize + " MB");
          return false;
        }
      };


      isTypeValid = function(type) {
        if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
          return true;
        } else {
          alert("Invalid file type.  File must be one of following types " + validMimeTypes);
          return false;
        }
      };


      element.bind('dragover', processDragOverOrEnter);
      element.bind('dragenter', processDragOverOrEnter);

      scope.CropFn = function() {
        console.log("cropfunction called")
        scope.myCroppedImage1 = scope.myCroppedImage;

        document.getElementById("display").style.display = "none";

      }


      scope.CloseFn = function() {

        scope.file = "null";
        //console.log(scope.file)

        scope.$watch(
          function watchfiles(scope) {
            // Return the "result" of the watch expression.
            return (scope.file);
          },
          function handleFileChange(newValue, oldValue) {
            // console.log("fn( scope.file):", newValue);
            //  console.log(scope.file);
          }
        );
 
        console.log('close function is called')

        document.getElementById("imageCrop").style.display = "none";

        document.getElementById("actImage").style.display = "none";

        document.getElementById("crop").style.display = "none";

        document.getElementById("close").style.display = "none";

        document.getElementById("display").style.display = "none";

        if (scope.myCroppedImage != '' && scope.myCroppedImage != null) {

          document.getElementById("imageCrop").style.display = "block";

          document.getElementById("display").style.display = "none";

        }

        if (scope.myCroppedImage1 != '' && scope.myCroppedImage1 != null) {

          document.getElementById("imageCrop").style.display = "block";

          document.getElementById("display").style.display = "none";

        }
      }


      var handleFileSelect = function(evt) {

        scope.file = "null";
        scope.myCroppedImage = '';
        //alert('click function is called')

        scope.file = "null";
        scope.myCroppedImage = '';
        //alert('click function is called')





        document.getElementById("actImage").style.display = "block";

        document.getElementById("crop").style.display = "block";

        document.getElementById("close").style.display = "block";

        var file = evt.currentTarget.files[0];

        if (file !== undefined) {
          var reader = new FileReader();
          reader.onload = function(evt) {
            scope.$apply(function($scope) {
              scope.image = evt.target.result;
              //console.log(scope.image);
            });
          };
          reader.readAsDataURL(file);
          document.getElementById("display").style.display = "block";
        }
      };
      angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);



      return element.bind('drop', function(event) {

        console.log('drop');
        scope.myCroppedImage = '';
        document.getElementById("display").style.display = "block";

        //console.log(modal);

        document.getElementById("actImage").style.display = "block";

        document.getElementById("crop").style.display = "block";

        document.getElementById("close").style.display = "block";


        var file, name, reader, size, type;
        if (event != null) {
          event.preventDefault();
        }

        reader = new FileReader();
        reader.onload = function(evt) {
          //handleFileSelect(evt);
          if (checkSize(size) && isTypeValid(type)) {
            return scope.$apply(function() {
              scope.file = evt.target.result;
              scope.image = evt.target.result;
              console.log(scope.file);
              if (angular.isString(scope.fileName)) {
                return scope.fileName = name;
              }
            });
          }
        };
        //console.log(event.dataTransfer.files[0]);
        file = event.dataTransfer.files[0];
        //name = file.name;
        //console.log(name);
        type = file.type;
        //console.log(type);
        size = file.size;
        //console.log(size);
        reader.readAsDataURL(file);

        //console.log('heya' + file);
        return false;

      });



      // return element.bind('click', function(event){

      // });






    }
  };
});