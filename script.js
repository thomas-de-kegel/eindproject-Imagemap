function clickedMe(item) {
    var mapName;
    mapName = $(item).parent().attr('name');
    $('img').each(function(){
        if($(this).attr('usemap') == '#'+mapName){
            alert($(this).attr('id'));            
        }       
    });
}