requirejs.config({paths:{nav:"../js/nav"}});requirejs(["nav"],function(a){$(function(){a.init({logo:true,search_open:false,search:true,signin:true})})});