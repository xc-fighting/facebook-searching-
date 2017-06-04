//global variables
var searchType="Users";
var searchContent="";
var dataFromPHP="";
var nextURL="";
var previousURL="";
var lastPage="";
var storage=window.localStorage;
var latitude,longitude;
var isFavorite=false;

function showProgressBar(){
  var temp=" <div class='vertical-center'><div class='container'><div class='row'><div class='col-md-2'></div><div class='col-md-8'><div class='progress progress-striped active'><div class='progress-bar' role='progressbar'  style='width:50%'></div></div><div class='col-md-2'></div></div></div></div></div>";




  switch(searchType){
    case "Users":
        $("#users").text("");
        $("#users").append(temp);
    break;     
    case "Places":
     $("#places").text("");
     $("#places").append(temp);
    break;
    case "Pages":
       $("#pages").text("");
       $("#pages").append(temp);
    break;
    case "Groups":
       $("#groups").text("");
       $("#groups").append(temp);
    break;
    case "Events":
         $("#events").text("");
         $("#events").append(temp);
    break;
    case "Favorites":
        $("#favorites").text("");
        $("#favorites").append(temp);
    break;

  }
}

function FavoriteObj(id,url,name){
  return{
    ID:id,
    URL:url,
    NAME:name,
    TYPE:searchType
  }
}
function addToFavorite(obj,id,url,name)
{

   $(obj).children("span").toggleClass("star glyphicon-star glyphicon-star-empty");
//   alert("you add to favorite "+id+" "+url+" "+name);
  // $(".glyphicon .glyphicon-star-empty").toggleClass("star glyphicon glyphicon-star");
   var item=FavoriteObj(id,url,name);
   var str=JSON.stringify(item);
 //  alert(str);
   storage.setItem(id,str);
}
function checkFavorite(id)
{
  //alert(id);
  if(storage.getItem(id)!=null)return true;
  else return false;
}
function deleteFavorite(id)
{
  storage.removeItem(id);
  showFavorites();
}
function showFavorites()
{
        storage=window.localStorage;
        var htmlstr="";
        htmlstr+="<table class=\"table\">";
        htmlstr+="<thead><tr><th>#</th><th>Profile photo</th><th>Name</th><th>Type</th><th>Favorite</th><th>Details</th></tr></thead>";
        htmlstr+="<tbody>";
        for(i=0;i<storage.length;i++){
           //alert(storage.length);
          
           var storage_obj=JSON.parse(storage.getItem(storage.key(i)));
           htmlstr+="<tr>";
           htmlstr+="<td>"+(i+1)+"</td>";
           htmlstr+="<td><img src='"+storage_obj.URL+"' class='img-circle' width='40px' height='40px'></td>";
           htmlstr+="<td>"+storage_obj.NAME+"</td>";
           htmlstr+="<td>"+storage_obj.TYPE+"</td>";
           
           htmlstr+="<td><button class='btn btn-default'  onclick=\"deleteFavorite('"+storage_obj.ID+"')\"><span class='glyphicon glyphicon-trash'>"
                      +"</span></button></td>";
           
           

           htmlstr+="<td><button class='btn btn-default' onclick='showDetail(\""+storage_obj.ID+"\")' value='"+storage_obj.ID+"'><span class='glyphicon glyphicon-menu-right'></span></button></td>";
           htmlstr+="</tr>";
        }
        htmlstr+="</tbody></table>";
        lastPage=htmlstr;
        $("#favorites").text("");
        $("#favorites").append(htmlstr);
}




function showHTML(result)
{

 // alert(result.data.length);
//  alert(result.data.length);
  var htmlstr="";
  switch(searchType)
  {
    case "Users":
    {
        htmlstr="";
        htmlstr+="<table class=\"table\">";
        htmlstr+="<thead><tr><th>#</th><th>Profile photo</th><th>Name</th><th>Favorite</th><th>Details</th></tr></thead>";
        htmlstr+="<tbody>";
        var dataItem=result.data;
        for(i=0;i<dataItem.length;i++){
           htmlstr+="<tr>";
           htmlstr+="<td>"+(i+1)+"</td>";
           htmlstr+="<td><img src='"+dataItem[i].picture.data.url+"' class='img-circle' width='40px' height='40px'></td>";
           htmlstr+="<td>"+dataItem[i].name+"</td>";
           if(checkFavorite(dataItem[i].id)==false)
           {
             htmlstr+="<td><button class='btn btn-default'  onclick='addToFavorite(this,\""+dataItem[i].id+"\",\""+dataItem[i].picture.data.url+"\",\""+dataItem[i].name+"\")'><span class='glyphicon glyphicon-star-empty'>"
                      +"</span></button></td>";
           }
           else{
            htmlstr+="<td><button class='btn btn-default'><span class='star glyphicon glyphicon-star'>"
                      +"</span></button></td>";
           }

           htmlstr+="<td><button class='btn btn-default' onclick='showDetail(\""+dataItem[i].id+"\")' value='"+dataItem[i].id+"'><span class='glyphicon glyphicon-menu-right'></span></button></td>";
           htmlstr+="</tr>";
        }
        htmlstr+="</tbody></table>";
        var page=result.paging;
        htmlstr+="<div class='container'><div class='row'>";
      /*  if(page.previous!=null){
          previousURL=page.previous;
          htmlstr+="<div class='col-md-6'><button type='button' class='btn btn-secondary' id='prebtn' onclick=\"showPre()\">previous</button></div>";
        }


        if(page.next!=null){
            nextURL=page.next;
            htmlstr+="<div class='col-md-6'><button type='button' class='btn btn-secondary'  id=\"nextbtn\" onclick=\"showNext()\">&nbsp;&nbsp;next&nbsp;&nbsp;</button></div>";
           
        }*/
       htmlstr+="<div class='col-md-6' id='leftpart'>";
       if(page.previous!=null){
          previousURL=page.previous;
          htmlstr+="<button type='button' class='btn pull-right' id='prebtn' onclick=\"showPre()\">previous</button>";
          
        }
       htmlstr+="</div>";
       htmlstr+="<div class='col-md-6' id='rightpart'>";
        if(page.next!=null){
            nextURL=page.next;
            htmlstr+="<button type='button' class='btn'  id='nextbtn' onclick=\"showNext()\">next</button>";
            
        }
       htmlstr+="</div>";
      
        htmlstr+="</div></div>";
        lastPage=result;
        $("#users").text("");
        $("#users").append(htmlstr);
    }break;
    case "Pages":
    {
        htmlstr="";
        htmlstr+="<table class=\"table\">";
        htmlstr+="<thead><tr><th>#</th><th>Profile photo</th><th>Name</th><th>Favorite</th><th>Details</th></tr></thead>";
        htmlstr+="<tbody>";
        var dataItem=result.data;
        for(i=0;i<dataItem.length;i++){
           htmlstr+="<tr>";
           htmlstr+="<td>"+(i+1)+"</td>";
           htmlstr+="<td><img src='"+dataItem[i].picture.data.url+"' class='img-circle' width='40px' height='40px'></td>";
           htmlstr+="<td>"+dataItem[i].name+"</td>";
            if(checkFavorite(dataItem[i].id)==false)
           {
             htmlstr+="<td><button class='btn btn-default'  onclick='addToFavorite(this,\""+dataItem[i].id+"\",\""+dataItem[i].picture.data.url+"\",\""+dataItem[i].name+"\")'><span class='glyphicon glyphicon-star-empty'>"
                      +"</span></button></td>";
           }
           else{
            htmlstr+="<td><button class='btn btn-default'><span class='star glyphicon glyphicon-star'>"
                      +"</span></button></td>";
           }



           htmlstr+="<td><button class='btn btn-default' onclick='showDetail(\""+dataItem[i].id+"\")' value='"+dataItem[i].id+"'><span class='glyphicon glyphicon-menu-right'></span></button></td>";
           htmlstr+="</tr>";
        }
        htmlstr+="</tbody></table>";
        var page=result.paging;

          htmlstr+="<div class='container'><div class='row'>";
      /*  if(page.previous!=null){
          previousURL=page.previous;
          htmlstr+="<div class='col-md-6'><button type='button' class='btn btn-secondary' id='prebtn' onclick=\"showPre()\">previous</button></div>";
        }


        if(page.next!=null){
            nextURL=page.next;
            htmlstr+="<div class='col-md-6'><button type='button' class='btn btn-secondary'  id=\"nextbtn\" onclick=\"showNext()\">&nbsp;&nbsp;next&nbsp;&nbsp;</button></div>";
           
        }*/
       htmlstr+="<div class='col-md-6' id='leftpart'>";
       if(page.previous!=null){
          previousURL=page.previous;
          htmlstr+="<button type='button' class='btn pull-right' id='prebtn' onclick=\"showPre()\">previous</button>";
          
        }
       htmlstr+="</div>";
       htmlstr+="<div class='col-md-6' id='rightpart'>";
        if(page.next!=null){
            nextURL=page.next;
            htmlstr+="<button type='button' class='btn'  id='nextbtn' onclick=\"showNext()\">next</button>";
            
        }
       htmlstr+="</div>";
      
        htmlstr+="</div></div>";

        lastPage=result;
        $("#pages").text("");
        $("#pages").append(htmlstr);


    }break;
    case "Events":
    {
       htmlstr="";
        htmlstr+="<table class=\"table\">";
        htmlstr+="<thead><tr><th>#</th><th>Profile photo</th><th>Name</th><th>Favorite</th><th>Details</th></tr></thead>";
        htmlstr+="<tbody>";
        var dataItem=result.data;
        for(i=0;i<dataItem.length;i++){
           htmlstr+="<tr>";
           htmlstr+="<td>"+(i+1)+"</td>";
           htmlstr+="<td><img src='"+dataItem[i].picture.data.url+"' class='img-circle' width='40px' height='40px'></td>";
           htmlstr+="<td>"+dataItem[i].name+"</td>";
            if(checkFavorite(dataItem[i].id)==false)
           {
             htmlstr+="<td><button class='btn btn-default'  onclick='addToFavorite(this,\""+dataItem[i].id+"\",\""+dataItem[i].picture.data.url+"\",\""+dataItem[i].name+"\")'><span class='glyphicon glyphicon-star-empty'>"
                      +"</span></button></td>";
           }
           else{
            htmlstr+="<td><button class='btn btn-default'><span class='star glyphicon glyphicon-star'>"
                      +"</span></button></td>";
           }



           htmlstr+="<td><button class='btn btn-default' onclick='showDetail(\""+dataItem[i].id+"\")' value='"+dataItem[i].id+"'><span class='glyphicon glyphicon-menu-right'></span></button></td>";
           htmlstr+="</tr>";
        }
        htmlstr+="</tbody></table>";
        var page=result.paging;

        htmlstr+="<div class='container'><div class='row'>";
      /*  if(page.previous!=null){
          previousURL=page.previous;
          htmlstr+="<div class='col-md-6'><button type='button' class='btn btn-secondary' id='prebtn' onclick=\"showPre()\">previous</button></div>";
        }


        if(page.next!=null){
            nextURL=page.next;
            htmlstr+="<div class='col-md-6'><button type='button' class='btn btn-secondary'  id=\"nextbtn\" onclick=\"showNext()\">&nbsp;&nbsp;next&nbsp;&nbsp;</button></div>";
           
        }*/
       htmlstr+="<div class='col-md-6' id='leftpart'>";
       if(page.previous!=null){
          previousURL=page.previous;
          htmlstr+="<button type='button' class='btn pull-right' id='prebtn' onclick=\"showPre()\">previous</button>";
          
        }
       htmlstr+="</div>";
       htmlstr+="<div class='col-md-6' id='rightpart'>";
        if(page.next!=null){
            nextURL=page.next;
            htmlstr+="<button type='button' class='btn'  id='nextbtn' onclick=\"showNext()\">next</button>";
            
        }
       htmlstr+="</div>";
      
        htmlstr+="</div></div>";

        lastPage=result;
        $("#events").text("");
        $("#events").append(htmlstr);

    }break;
    case "Places":
    {
        htmlstr="";
        htmlstr+="<table class=\"table\">";
        htmlstr+="<thead><tr><th>#</th><th>Profile photo</th><th>Name</th><th>Favorite</th><th>Details</th></tr></thead>";
        htmlstr+="<tbody>";
        var dataItem=result.data;
        for(i=0;i<dataItem.length;i++){
           htmlstr+="<tr>";
           htmlstr+="<td>"+(i+1)+"</td>";
           htmlstr+="<td><img src='"+dataItem[i].picture.data.url+"' class='img-circle' width='40px' height='40px'></td>";
           htmlstr+="<td>"+dataItem[i].name+"</td>";
           if(checkFavorite(dataItem[i].id)==false)
           {
             htmlstr+="<td><button class='btn btn-default'  onclick='addToFavorite(this,\""+dataItem[i].id+"\",\""+dataItem[i].picture.data.url+"\",\""+dataItem[i].name+"\")'><span class='glyphicon glyphicon-star-empty'>"
                      +"</span></button></td>";
           }
           else{
            htmlstr+="<td><button class='btn btn-default'><span class='star glyphicon glyphicon-star'>"
                      +"</span></button></td>";
           }



           htmlstr+="<td><button class='btn btn-default' onclick='showDetail(\""+dataItem[i].id+"\")' value='"+dataItem[i].id+"'><span class='glyphicon glyphicon-menu-right'></span></button></td>";
           htmlstr+="</tr>";
        }
        htmlstr+="</tbody></table>";
        var page=result.paging;

          htmlstr+="<div class='container'><div class='row'>";
     /*   if(page.previous!=null){
          previousURL=page.previous;
          htmlstr+="<div class='col-md-6'><button type='button' class='btn btn-secondary' id='prebtn' onclick=\"showPre()\">previous</button></div>";
        }


        if(page.next!=null){
            nextURL=page.next;
            htmlstr+="<div class='col-md-6'><button type='button' class='btn btn-secondary'  id=\"nextbtn\" onclick=\"showNext()\">&nbsp;&nbsp;next&nbsp;&nbsp;</button></div>";
           
        }*/
       htmlstr+="<div class='col-md-6' id='leftpart'>";
       if(page.previous!=null){
          previousURL=page.previous;
          htmlstr+="<button type='button' class='btn pull-right' id='prebtn' onclick=\"showPre()\">previous</button>";
          
        }
       htmlstr+="</div>";
       htmlstr+="<div class='col-md-6' id='rightpart'>";
        if(page.next!=null){
            nextURL=page.next;
            htmlstr+="<button type='button' class='btn'  id='nextbtn' onclick=\"showNext()\">next</button>";
            
        }
       htmlstr+="</div>";
      
        htmlstr+="</div></div>";

        lastPage=result;
        $("#places").text("");
        $("#places").append(htmlstr);
    }break;
    case "Groups":
    {
         htmlstr="";
        htmlstr+="<table class=\"table\">";
        htmlstr+="<thead><tr><th>#</th><th>Profile photo</th><th>Name</th><th>Favorite</th><th>Details</th></tr></thead>";
        htmlstr+="<tbody>";
        var dataItem=result.data;
        for(i=0;i<dataItem.length;i++){
           htmlstr+="<tr>";
           htmlstr+="<td>"+(i+1)+"</td>";
           htmlstr+="<td><img src='"+dataItem[i].picture.data.url+"' class='img-circle' width='40px' height='40px'></td>";
           htmlstr+="<td>"+dataItem[i].name+"</td>";
           if(checkFavorite(dataItem[i].id)==false)
           {
             htmlstr+="<td><button class='btn btn-default'  onclick='addToFavorite(this,\""+dataItem[i].id+"\",\""+dataItem[i].picture.data.url+"\",\""+dataItem[i].name+"\")'><span class='glyphicon glyphicon-star-empty'>"
                      +"</span></button></td>";
           }
           else{
            htmlstr+="<td><button class='btn btn-default'><span class='star glyphicon glyphicon-star'>"
                      +"</span></button></td>";
           }



           htmlstr+="<td><button class='btn btn-default' onclick='showDetail(\""+dataItem[i].id+"\")' value='"+dataItem[i].id+"'><span class='glyphicon glyphicon-menu-right'></span></button></td>";
           htmlstr+="</tr>";
        }
        htmlstr+="</tbody></table>";
        var page=result.paging;

         htmlstr+="<div class='container'><div class='row'>";
      /*  if(page.previous!=null){
          previousURL=page.previous;
          htmlstr+="<div class='col-md-6'><button type='button' class='btn btn-secondary' id='prebtn' onclick=\"showPre()\">previous</button></div>";
        }


        if(page.next!=null){
            nextURL=page.next;
            htmlstr+="<div class='col-md-6'><button type='button' class='btn btn-secondary'  id=\"nextbtn\" onclick=\"showNext()\">&nbsp;&nbsp;next&nbsp;&nbsp;</button></div>";
           
        }*/
       htmlstr+="<div class='col-md-6' id='leftpart'>";
       if(page.previous!=null){
          previousURL=page.previous;
          htmlstr+="<button type='button' class='btn pull-right' id='prebtn' onclick=\"showPre()\">previous</button>";
          
        }
       htmlstr+="</div>";
       htmlstr+="<div class='col-md-6' id='rightpart'>";
        if(page.next!=null){
            nextURL=page.next;
            htmlstr+="<button type='button' class='btn'  id='nextbtn' onclick=\"showNext()\">next</button>";
            
        }
       htmlstr+="</div>";
      
        htmlstr+="</div></div>";
        lastPage=result;
        $("#groups").text("");
        $("#groups").append(htmlstr);

    }break;
    
  }
}

function facebookshow(name,url)
{
 // alert(name+url);
  FB.ui({
    app_id:'356531478081166',
    link:'https://developers.facebook.com/docs/',
    method:'feed',
    picture:url,
    name:name,
    caption:'FB SEARCH FROM USC CSCI571'
  },function(response){
     if(response&&!response.error_message){
       alert("post success");
     }
     else alert("no post");
  });
}
function detailFavorite(obj,id,name,url)
{
 // alert(obj+" "+ id+" "+name+" "+url);
  $(obj).children("span").toggleClass("star glyphicon-star glyphicon-star-empty");
  if(isFavorite==true)
  {
     storage.removeItem(id);
     isFavorite=false;
  }
  else
  {
    isFavorite=true;
    var item=FavoriteObj(id,url,name);
    var str=JSON.stringify(item);
 //   alert(str);
    storage.setItem(id,str);
  }
}
function showDetail(ID)
{
   if(searchType!="Events")
   {
   
     $.get("myserver.php",{"userID":ID},function(data){
  //   alert(data+" "+searchType+" "+ID);
     
     var result=$.parseJSON(data);
     var str="";
     
     //container
     str+="<div class='container'>";
     
     //row1
     str+="<div class='row nav-justified primary'>";
     str+="<div class='col-md-6'><button class='btn backp' aria-label='Left Align' onclick='back()'><span class='glyphicon glyphicon-chevron-left' aria-hidden='true'>Back</span></button></div>";
     str+="<div class='col-md-6'>";
    
     str+="<button class='btn facebookbtn  pull-right' onclick='facebookshow(\""+result.name+"\",\""+result.picture.data.url+"\")'></button>";
      if(checkFavorite(result.id)==false)
     {
      isFavorite=false;
      str+="<button class='btn  pull-right detailf' onclick='detailFavorite(this,\""+result.id+"\",\""+result.name+"\",\""+result.picture.data.url+"\")'><span class='glyphicon glyphicon-star-empty'></span></button>";
     }
     else
     {
       isFavorite=true;
       str+="<button class='btn btn-default pull-right detailf' onclick='detailFavorite(this,\""+result.id+"\",\""+result.name+"\",\""+result.picture.data.url+"\")'><span class='star glyphicon glyphicon-star'></span></button>";
     }
     str+="</div>";
     str+="</div>";
     //row1 above

     //row2
     str+="<div class='row'>";
     //album start
     str+="<div class='col-md-6'>";
     //panel start
     str+=   "<div class='panel-group' id='accordion1'>";
     str+=         "<div class='panel panel-default'>";
     str+=               "<div class='panel-heading'>";
     str+=                     "<h4 class='panel-title'>Albums</h4>";
     str+=                "</div>";
     str+=         "</div>";
     //insert here

     if(result.albums!=null)
     { 
        var albumlist=result.albums.data;
        for(i=0;i<albumlist.length;i++){
          str+="<div class='panel panel-default'>";
          str+=      "<div class='panel-heading'>";
          str+=            "<h4 class='panel-title'>";
          str+=                 "<a data-toggle='collapse' data-parent='#accordion1' href=\"#album"+i+"\">";
          str+=                   albumlist[i].name;
          str+=                 "</a>";
          str+=             "</h4>";
          str+=       "</div>";
          str+=       "<div id=\"album"+i+"\""+" class='panel-collapse collapse'>";
         
          if(albumlist[i].photos!=null){
                var photolist=albumlist[i].photos.data;
                for(j=0;j<photolist.length;j++){
                  str+="<img class='img-rounded' src='"+"https://graph.facebook.com/v2.8/"+photolist[j].id+"/picture?access_token=EAAFEQ3QaLo4BAFhb8ttZBC7pevj16spW3pZCnxBfD1EUy8MZAG6XofJppyLfrazwTMrE59QO7GTDCexzIW13aPtDIGmb9fy0wI0xB9TqwpDbDDBTCwOKG2kZCR5bF6vkcZBrWq0HezIQju4TDqKMBP3L8taCl3AQZD' width='100%'/>";
                  str+="<br/><br/>";
                }
          }
          else
          {
             str+="<div class='alert alert-warning' role='alert'><strong>no data</div>";
          }
                     
          str+=       "</div>";
          str+="</div>";
        }
     }



     else
     {
        //solve the condition when no album
        //str+="<div class='panel panel-default'>";
        //str+="<div class='panel-body'>";
        str+="<div class='alert alert-warning' role='alert'><strong>no data</div>";
        //str+="</div></div>";
     }
     str+=   "</div>";
     str+="</div>";
     //album end

     //post start
     str+="<div class='col-md-6'>";
     //panel start
     str+=      "<div class='panel-group'>";

     str+=            "<div class='panel panel-default'>";
     str+=                  "<div class='panel-heading'>";
     str+=                        "<h4 class='panel-title'>Posts</h4>";
     str+=                  "</div>";
     str+=             "</div>";
    //insert here
    
     if(result.posts!=null){
        var postlist=result.posts.data;
        for(index=0;index<postlist.length;index++)
        {
            str+="<div class='panel panel-default'>";
            str+=      "<div></div>";
            str+=      "<div class='media postitem'>";   
            str+=            "<img width='40px' height='40px' class='pull-left' src='"+result.picture.data.url+"'>";  
            str+=             "<div class='media-body'>";
            str+=        "<h4 class='media-heading'>"+result.name+"</h4>";
            str+=         "<div class='text-muted'>"+moment(postlist[index].created_time).format('YYYY-MM-DD HH:mm:ss')+"</div>";
            str+=    "</div>";
            str+=    "</div>";
            str+=     "<p class='postContent'>";
            str+=     postlist[index].message;
            str+=     "</p>";
        
          str+="</div>";
        }
         
     }
     else
     {
       str+="<div class='alert alert-warning' role='alert'><strong>no data</div>";
     }
     str+=       "</div>";
     //panel end
     str+="</div>"
     //post end

     str+="</div>";
     //row2 above

     //container
     str+="</div>";
     switch(searchType){
           case "Users":
           {
              $("#users").text("");
             $("#users").append(str);
           }break;
           case "Pages":
           {
             $("#pages").text("");
             $("#pages").append(str);
           }break;
           case "Events":
           {
            $("#events").text("");
            $("#events").append(str);
           }break;
           case "Places":
           {
             $("#places").text("");
             $("#places").append(str);
           }break;
           case "Groups":
           {
             $("#groups").text("");
             $("#groups").append(str);
           }break;
           case "Favorites":
           {
            $("#favorites").text("");
            $("#favorites").append(str);
           }break;
     }
   });

   }
   else
   {

       var str="";
          //container
       str+="<div class='container'>";
       
       //row1
       str+="<div class='row nav-justified primary'>";
       str+="<div class='col-md-6'><button class='btn btn-default btn-lg' aria-label='Left Align' onclick='back()'><span class='glyphicon glyphicon-chevron-left' aria-hidden='true'>back</span></button></div>";
       str+="<div class='col-md-6'>abc</div>";
       str+="</div>";
       //row1 above

       //row2
       str+="<div class='row'>";
       //album start
       str+="<div class='col-md-6'>";
       //panel start
       str+=   "<div class='panel-group' id='accordion1'>";
       str+=         "<div class='panel panel-default'>";
       str+=               "<div class='panel-heading'>";
       str+=                     "<h4 class='panel-title'>Albums</h4>";
       str+=                "</div>";
       str+=         "</div>";
     //insert here
        //solve the condition when no album
        
        str+="<div class='alert alert-warning' role='alert'><strong>no data</div>";
        
     
     str+=   "</div>";
     str+="</div>";
     //album end

     //post start
     str+="<div class='col-md-6'>";
     //panel start
     str+=      "<div class='panel-group'>";

     str+=            "<div class='panel panel-default'>";
     str+=                  "<div class='panel-heading'>";
     str+=                        "<h4 class='panel-title'>Posts</h4>";
     str+=                  "</div>";
     str+=             "</div>";
    //insert here
     str+=  "<div class='alert alert-warning' role='alert'><strong>no data</div>";
     str+=       "</div>";

     //panel end
     str+="</div>"
     //post end

     str+="</div>";
     //row2 above

     //container
     str+="</div>";
     $("#events").text("");
     $("#events").append(str);
   }
   
}
function back()
{
  /* switch(searchType){
    case "Users":
    {
      $("#users").text("");
      $("#users").append(lastPage);
    }break;
    case "Pages":
    {
      $("#pages").text("");
      $("#pages").append(lastPage);
    }break;
    case "Favorites":
    {
      $("#favorites").text("");
      $("#favorites").append(lastPage);
    }
  }*/
  if(searchType=="Favorites")
  {
    showFavorites(lastPage);
  }
  else
  showHTML(lastPage);

}
function showNext()
{
  $.get("http://csci571chenxu-env.us-west-1.elasticbeanstalk.com/myserver.php",{"nexturl":nextURL},function(data){
    dataFromPHP=data;
 //   alert(data);
    var result=$.parseJSON(data);
    showHTML(result);
  })
}
  
function showPre()
{
   $.get("http://csci571chenxu-env.us-west-1.elasticbeanstalk.com/myserver.php",{"previousurl":previousURL},function(data){
    dataFromPHP=data;
 //   alert(data);
    var result=$.parseJSON(data);
    showHTML(result);
  })
}

function success(pos)
{
  var crd=pos.coords;
  latitude=crd.latitude;
  longitude=crd.longitude;
 // alert(latitude+" "+longitude);
}
function error()
{
  //alert(error.code+" "+error.message);
  console.Log(error.code+" "+error.message);
}
$("document").ready(function(){
      $("#clearbtn").click(clearAll);
    //  $("#searchbtn").click(searchResult);
    $("#searchTab a:first").tab("show");
     var options={
          enableHighAccuracy:true,
          timeout:5000,
          maximumAge:0
       };
       
       navigator.geolocation.getCurrentPosition(success,error,options);
      
});
$("#searchTab li").click(function(){
     searchType=$(this).text();
     if($("#inputtext").val()!=""&&searchType!="Favorites"&&searchType!="Places")
     {
        showProgressBar();
       	$.get("http://csci571chenxu-env.us-west-1.elasticbeanstalk.com/myserver.php",{content:searchContent,type:searchType},function(data){
  //        alert(data);
          dataFromPHP=data;
         var result=$.parseJSON(data);
         showHTML(result);
         });
     }
     else if(searchType=="Places")
     {
        showProgressBar();
        $.get("http://csci571chenxu-env.us-west-1.elasticbeanstalk.com/myserver.php",{content:searchContent,type:searchType,
          "latitude":latitude,"longitude":longitude},function(data){
  //      alert(data);
        dataFromPHP=data;
       var result=$.parseJSON(data);
       showHTML(result);
       });
     }
     else if(searchType=="Favorites")
     {
       showProgressBar();
       showFavorites();
     }
     else 
     {
      alert("input content can not be empty");
     }
});
function clearAll()
{
	$("#inputtext").val("");
  searchContent="";
  searchType="Users";
  $("#searchTab a:first").tab('show');
  $("#users").text("");
  $("#events").text("");
  $("#places").text("");
  $("#groups").text("");
  $("favorites").text("");

}
function searchResult(){
  

   searchContent=$("#inputtext").val();
 //   alert(searchType+" "+searchContent);
   if(searchContent!=""&&searchType!="Places")
   {
         showProgressBar();
          $.get("http://csci571chenxu-env.us-west-1.elasticbeanstalk.com/myserver.php",{content:searchContent,type:searchType},function(data){
            //   alert(data)
               dataFromPHP=data;
               var result=$.parseJSON(data);
               showHTML(result);
     });
   }
   else if(searchType=="Places")
   {
        showProgressBar();
        $.get("http://csci571chenxu-env.us-west-1.elasticbeanstalk.com/myserver.php",{content:searchContent,type:searchType,
          "latitude":latitude,"longitude":longitude},function(data){
 //       alert(data);
        dataFromPHP=data;
       var result=$.parseJSON(data);
       showHTML(result);
       });
   }
   else
   {
     alert("input content cannot be empty");
   }
  
}


