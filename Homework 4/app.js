$.get('http://localhost:3000/Actors', function(response){
    var actorList = response;
    var star = true;
    //console.log(actorList.length);
    for(var i=0; i<actorList.length;i++){
        
        if (actorList[i].starred == true)
            star = 'star';
        else
            star = 'star_border';
            
        //$("#actorList ul").append('<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons  mdl-list__item-avatar">person</i>'+ actorList[i].name);
        
        $('#actorList ul').append(
            $('<li>').attr('class','mdl-list__item').attr('id',actorList[i].id).append(
                $('<span>').attr('class','mdl-list__item-primary-content').append(
                    $('<i>').attr('class','material-icons  mdl-list__item-avatar').text('person')
                ).append(
                    $('<h6>').attr('id','userName').text(actorList[i].name)
                )
            ).append(
                $('<span>').attr('class','mdl-list__item-secondary-content').append(
                    $('<a>').attr('class','mdl-list__item-secondary-action').attr('href','#').append(
                        $('<i>').attr('class','material-icons').attr('id','star').attr('onclick','updateStarred()').text(star)
                    )
                )
            )
         ) 
    };
});

var addActor = function(){
    $.ajax({
       type: 'POST',
       dataType: 'json',
       url: 'http://localhost:3000/Actors/',
       data: {name: document.getElementById("nameInputField").value, starred: false}
    });
};

var updateStarred = function(){
    $('#actorList ul li').click(function(e){
            e.stopImmediatePropagation(); //prevent duplicate onclick event.
            var id = $(this).attr('id') //get userid
            var currentStarred = $(this).find('a').text(); //check if star is on or off
            var name = $(this).find('h6').text(); //get username
            
            console.log(id);
            console.log(currentStarred);
            console.log(name);
            
            if (currentStarred == 'star')
                currentStarred = false;
            else
                currentStarred = true;
                
        $.ajax({
                type: 'PUT',
                dataType: 'json',
                url: 'http://localhost:3000/Actors/' + id,
                data: {id: id, name:name, starred:currentStarred}
        });  
    });
};