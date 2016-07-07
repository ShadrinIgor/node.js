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
                $scope.list = null;

                $http.get( "/console/tinymce/dir" )
                    .then(
                        function (response) {
                            $scope.list = response.data || [];
                        },
                        function () {
                        }
                    );

                $scope.SelectImage = function( image ){
                    console.log( image );
                    alert('Есть такой');
                }
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

    /*
     $('.imageBlock0').live('dblclick', function(){
     var e = $(this);

     if(e.attr('type') == 'files')
     {
     var filesize = e.attr('fsizetext');
     var text = '<a href="'+e.attr('linkto')+'" '+addAttr+' title="'+e.attr('fname')+'">';
     text += e.attr('fname');
     text += '</a> ' + ' ('+filesize+') ';
     }
     else
     {
     if(e.attr('fmiddle')) {
     var addAttr = (e.attr('fclass')!=''?'class="'+e.attr('fclass')+'"':'')+' '+(e.attr('frel')!=''?'rel="'+e.attr('frel')+'"':'');
     var text = '<a href="'+e.attr('linkto')+'" '+addAttr+' title="'+e.attr('fname')+'">';
     text += '<img src="'+e.attr('fmiddle')+'" width="'+e.attr('fmiddlewidth')+'" height="'+e.attr('fmiddleheight')+'" alt="'+e.attr('fname')+'" />';
     text += '</a> ';
     } else {
     var text = '<img src="'+e.attr('linkto')+'" width="'+e.attr('fwidth')+'" height="'+e.attr('fheight')+'" alt="'+e.attr('fname')+'" /> ';
     }
     }

     ImagesDialog.insert(text);

     if($('.imageBlockAct').length == 1) {
     tinyMCEPopup.close();
     }
     });
     */

}());
