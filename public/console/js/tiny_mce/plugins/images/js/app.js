/*
 * jQuery File Upload Plugin Angular JS Example
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global window, angular */

var ImagesDialog = {
    init : function(ed) {
        tinyMCEPopup.resizeToInnerSize();
    },

    insert : function(text) {
        var ed = tinyMCEPopup.editor, dom = ed.dom;
        tinyMCEPopup.execCommand('mceInsertContent', false, text);
        //tinyMCEPopup.close();
    }
};

tinyMCEPopup.onInit.add(ImagesDialog.init, ImagesDialog);

var n=0;

(function () {
    'use strict';

    var isOnGitHub = window.location.hostname === 'blueimp.github.io',
        url = isOnGitHub ? '//jquery-file-upload.appspot.com/' : '/console/tinymce';

    angular.module('demo', [
        'blueimp.fileupload'
    ])
        .config([
            '$httpProvider', 'fileUploadProvider',
            function ($httpProvider, fileUploadProvider) {
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                fileUploadProvider.defaults.redirect = window.location.href.replace(
                    /\/[^\/]*$/,
                    '/cors/result.html?%s'
                );
                if (isOnGitHub) {
                    // Demo settings:
                    angular.extend(fileUploadProvider.defaults, {
                        // Enable image resizing, except for Android and Opera,
                        // which actually support image resizing, but fail to
                        // send Blob objects via XHR requests:
                        disableImageResize: /Android(?!.*Chrome)|Opera/
                            .test(window.navigator.userAgent),
                        maxFileSize: 999000,
                        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
                    });
                }
            }
        ])

        .controller('DemoFileUploadController', [
            '$scope', '$http', '$filter', '$window',
            function ($scope, $http) {
                $scope.options = {
                    url: url
                };
                if (!isOnGitHub) {
                    $scope.loadingFiles = true;
                    $http.get(url)
                        .then(
                            function (response) {
                                $scope.loadingFiles = false;
                                $scope.queue = response.data.files || [];
                                //this.ListFileController();
                            },
                            function () {
                                $scope.loadingFiles = false;
                            }
                        );
                }
            }
        ])
        .controller('FileDestroyController', [
            '$scope', '$http',
            function ($scope, $http) {
                var file = $scope.file,
                    state;
                if (file.url) {
                    file.$state = function () {
                        return state;
                    };
                    file.$destroy = function () {
                        state = 'pending';
                        return $http({
                            url: file.deleteUrl,
                            method: file.deleteType
                        }).then(
                            function () {
                                state = 'resolved';
                                $scope.clear(file);
                            },
                            function () {
                                state = 'rejected';
                            }
                        );
                    };
                } else if (!file.$cancel && !file._index) {
                    file.$cancel = function () {
                        $scope.clear(file);
                    };
                }
            }
        ])

        .controller('ListFileController', [
            '$scope', '$http',
            function($scope, $http){
                $scope.list = [];
                $scope.folders = [];

                $http.get( "/console/tinymce/images" )
                    .then(
                        function (response) {
                            $scope.list = response.data || [];
                        },
                        function () {
                        }
                    );

                $http.get( "/console/tinymce/dir" )
                    .then(
                        function (response) {
                            $scope.folders = response.data || [];
                        },
                        function () {
                        }
                    );

                $scope.SelectImage = function( image, size ){
                    if( size != 3 ){
                        if( size == 2 )image = image.replace( '_3.', '_'+size+'.' );
                            else image = image.replace( '_3.', '.' );
                    }
                    ImagesDialog.insert('<img src="'+image+'" />');
                    tinyMCEPopup.close();
                };

                $scope.SelectFolder = function ( folder ){
                    alert('select folder');
                };

                $scope.folderAction = function ( folder, action ){
                    switch ( action )
                    {
                        case 'add' :
                        var result = prompt("Добавление папки", "");
                        if( result ) {
                            $http.post( "/console/tinymce/dir", {folder:result} )
                                .success(
                                    function (response) {
                                        if( parseInt( response ) == 1 ){
                                            $http.get( "/console/tinymce/dir" )
                                                .then(
                                                    function (response) {
                                                        $scope.folders = response.data || [];
                                                    },
                                                    function () {
                                                    }
                                                );
                                        }
                                        else alert('Произошла ошибка создания');
                                    }
                                );
                        }
                        break;

                        case 'del' :
                            var result = confirm("Вы действительно хотите удалить папку?");
                            if( result ) {
                                $http.post( "/console/tinymce/dir/?_method=delete", {folder:folder} )
                                    .success(
                                        function (response) {
                                            if( parseInt( response ) == 1 ){
                                                $http.get( "/console/tinymce/dir" )
                                                    .then(
                                                        function (response) {
                                                            $scope.folders = response.data || [];
                                                        },
                                                        function () {
                                                        }
                                                    );
                                            }
                                            else alert('Произошла ошибка удаления');
                                        }
                                    );
                            }
                            break;

                        case 'edit' :
                            var result =  prompt("Редактирование папки", folder);
                            if( result ) {
                                $http.post( "/console/tinymce/dir/?_method=put", {oldfolder:folder,folder:result} )
                                    .success(
                                        function (response) {
                                            if( parseInt( response ) == 1 ){
                                                $http.get( "/console/tinymce/dir" )
                                                    .then(
                                                        function (response) {
                                                            $scope.folders = response.data || [];
                                                        },
                                                        function () {
                                                        }
                                                    );
                                            }
                                            else alert('Произошла ошибка удаления');
                                        }
                                    );
                            }
                            break;
                    }
                };

            }
        ])
        .controller( 'ShowPreText', [ '$scope',
            function( $scope ){
                return ( ListFileController.list.length > 0 ) ? false : true;
            }
        ])
        .controller( 'showBlock', [ '$scope',
        function( $scope ){
            console.log( ListFileController.list );
            //return ( ListFileController.list.length > 0 ) ? true : false;
        }
    ]);

}());
