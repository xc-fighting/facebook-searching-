<?php
 
   header("Access-Control-Allow-Origin:*");
   if(isset($_GET['userID']))
   {
      $id=$_GET['userID'];
      $url="https://graph.facebook.com/v2.8/".$id."?fields=id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){name,picture}},posts.limit(5)&access_token=EAAFEQ3QaLo4BAFhb8ttZBC7pevj16spW3pZCnxBfD1EUy8MZAG6XofJppyLfrazwTMrE59QO7GTDCexzIW13aPtDIGmb9fy0wI0xB9TqwpDbDDBTCwOKG2kZCR5bF6vkcZBrWq0HezIQju4TDqKMBP3L8taCl3AQZD";
      $opt=array(
                'http'=>array(
                    'method'=>'GET',
                     'timeout'=>60
                  )
        );
      $context=stream_context_create($opt);
      $result=file_get_contents($url,false,$context);
      echo $result;
   }
   if(isset($_GET['previousurl']))
   {
       $url= $_GET['previousurl'];
       $opt=array(
                'http'=>array(
                    'method'=>'GET',
                    'timeout'=>60,
                  )
              );
       $context=stream_context_create($opt);
       $result=file_get_contents($url,false,$context);
       echo $result;
   }
   if(isset($_GET['nexturl']))
   {
      $url= $_GET['nexturl'];
       $opt=array(
                'http'=>array(
                    'method'=>'GET',
                    'timeout'=>60,
                  )
              );
       $context=stream_context_create($opt);
       $result=file_get_contents($url,false,$context);
       echo $result;
   }
   if(isset($_GET['content'])&&isset($_GET['type']))
   {
      $content = $_GET["content"];
       $type=$_GET["type"];
      
        $url="";
        $opt=array(
                    'http'=>array(
                        'method'=>'GET',
                        'timeout'=>60,
                      )
                  );
        $context=stream_context_create($opt);
        $result="";
       switch($type)
       {
         case "Users":
         {
           $url="https://graph.facebook.com/v2.8/search?q=".$content."&type=user&fields=id,name,picture.width(700).height(700)&access_token=EAAFEQ3QaLo4BAFhb8ttZBC7pevj16spW3pZCnxBfD1EUy8MZAG6XofJppyLfrazwTMrE59QO7GTDCexzIW13aPtDIGmb9fy0wI0xB9TqwpDbDDBTCwOKG2kZCR5bF6vkcZBrWq0HezIQju4TDqKMBP3L8taCl3AQZD";
           $result=file_get_contents($url,false,$context);
           //echo json_encode($result);
           echo $result;

         }break;
         case "Pages":
         {
             $url="https://graph.facebook.com/v2.8/search?q=".$content."&type=page&fields=id,name,picture.width(700).height(700)&access_token=EAAFEQ3QaLo4BAFhb8ttZBC7pevj16spW3pZCnxBfD1EUy8MZAG6XofJppyLfrazwTMrE59QO7GTDCexzIW13aPtDIGmb9fy0wI0xB9TqwpDbDDBTCwOKG2kZCR5bF6vkcZBrWq0HezIQju4TDqKMBP3L8taCl3AQZD";
           $result=file_get_contents($url,false,$context);
           //echo json_encode($result);
           echo $result;
         }break;
         case "Places":
         {
            $url="https://graph.facebook.com/v2.8/search?q=".$content."&type=place&fields=id,name,picture.width(700).height(700)&center=".$_GET['latitude'].",".$_GET['longitude']."&access_token=EAAFEQ3QaLo4BAFhb8ttZBC7pevj16spW3pZCnxBfD1EUy8MZAG6XofJppyLfrazwTMrE59QO7GTDCexzIW13aPtDIGmb9fy0wI0xB9TqwpDbDDBTCwOKG2kZCR5bF6vkcZBrWq0HezIQju4TDqKMBP3L8taCl3AQZD";
             $result=file_get_contents($url,false,$context);
           //echo json_encode($result);
           echo $result;
         }break;
         case "Groups":
         {
            $url="https://graph.facebook.com/v2.8/search?q=".$content."&type=group&fields=id,name,picture.width(700).height(700)&access_token=EAAFEQ3QaLo4BAFhb8ttZBC7pevj16spW3pZCnxBfD1EUy8MZAG6XofJppyLfrazwTMrE59QO7GTDCexzIW13aPtDIGmb9fy0wI0xB9TqwpDbDDBTCwOKG2kZCR5bF6vkcZBrWq0HezIQju4TDqKMBP3L8taCl3AQZD";
           $result=file_get_contents($url,false,$context);
           //echo json_encode($result);
           echo $result;
         }break;
         case "Events":
         {
            $url="https://graph.facebook.com/v2.8/search?q=".$content."&type=event&fields=id,name,picture.width(700).height(700)&access_token=EAAFEQ3QaLo4BAFhb8ttZBC7pevj16spW3pZCnxBfD1EUy8MZAG6XofJppyLfrazwTMrE59QO7GTDCexzIW13aPtDIGmb9fy0wI0xB9TqwpDbDDBTCwOKG2kZCR5bF6vkcZBrWq0HezIQju4TDqKMBP3L8taCl3AQZD";
           $result=file_get_contents($url,false,$context);
           //echo json_encode($result);
           echo $result;
         }break;
       }
   }
    

   
  
?>

