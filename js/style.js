const app = {
    lastDiv : " ",

    init: function(){
    
        //on selectionne toutes les div main_experience_div pour y placer un ecouteur d'évènement click
        let  allExperienceDiv = document.querySelectorAll(".main_experience_li");
        
        app.burgerMenu();
        app.animationDivExperience();
        for (let i = 0; i < allExperienceDiv.length; i++) {
            let experienceDiv = allExperienceDiv[i];

            app.bindCurrentTask(experienceDiv);
        }
    },
    

    burgerMenu: function()
    {
        let ham = document.querySelector(".ham")
        ham.addEventListener("click", app.toggleHamburger)

        var menuLinks = document.querySelectorAll(".menuLink")
        menuLinks.forEach( 
            function(menuLink) { 
            menuLink.addEventListener("click", app.toggleHamburger) 
            }
        )
    },

    toggleHamburger: function (){
        let navbar = document.querySelector(".navbar")
        let ham = document.querySelector(".ham")
         navbar.classList.toggle("showNav")
         ham.classList.toggle("showClose")

        
      },
    
    bindCurrentTask: function (experienceDiv) {
        let clic = experienceDiv;
        clic.style.cursor= "pointer";
        clic.addEventListener('click', app.handleClickExperience);
        
    },
    
    handleClickExperience: function(env){
        let currentDiv = env.currentTarget;
        let parentClasse = currentDiv.parentNode;

       app.changeTextExperienceTransparent(currentDiv);

        
        if(app.lastDiv === currentDiv)
        {

            if(parentClasse.className === "container--rigth-main_experience_flex_active")
            {
            parentClasse.className = "container--rigth-main_experience_flex";
            parentClasse.className.transitionDelay = "1s";
            currentDiv.firstElementChild.innerHTML = "Découvrir";
            console.log(currentDiv.firstElementChild);
            app.lastDiv = null;
            app.resetHiddenInfo();
            }
        }
        else 
        {

            if(parentClasse.className === "container--rigth-main_experience_flex_active" && app.lastDiv != currentDiv)
            {
                app.lastDiv = currentDiv;
                app.displayInfoForCurrentDiv(currentDiv.id);

            }
            else 
            {
                if(parentClasse.className === "container--rigth-main_experience_flex")
                {
                
                parentClasse.className = "container--rigth-main_experience_flex_active";
                parentClasse.className.transitionDelay = "1s";

                let liActive = parentClasse.childNodes

                for (let i = 0; i < liActive.length; i++) {
                    let experienceLi = liActive[i];
        
                    experienceLi.className="main_experience_li";
                }
                app.lastDiv = currentDiv;
                app.displayInfoForCurrentDiv(currentDiv.id);
                }
            }
            
        }

    },

    displayInfoForCurrentDiv: function(regex){
        app.resetHiddenInfo();
        //on modifie la class en fonction de la div ciblé
        if(regex === "pompier")
        {
            document.querySelector(".display_pompier").className = "display_pompier";
        }
        else if (regex === "mcdo")
        {
            document.querySelector(".display_mcdo").className = "display_mcdo"; 
        }
        else if (regex === "marine")
        {
            document.querySelector(".display_marine").className = "display_marine";
        }
        else if (regex === "indigo")
        {
            document.querySelector(".display_indigo").className = "display_indigo";
        }
    },

    resetHiddenInfo: function()
    {
        let  pompier = document.querySelector(".display_pompier");
        let  mcdo = document.querySelector(".display_mcdo");
        let  marine = document.querySelector(".display_marine");
        let  indigo = document.querySelector(".display_indigo");

        //on défini toutes les div en hidden 
        pompier.className = "hidden display_pompier";
        mcdo.className= "hidden display_mcdo";
        marine.className= "hidden display_marine";
        indigo.className= "hidden display_indigo";
    },

     changeTextExperienceTransparent: function(currentDiv)
     {
         let  allExperienceDiv = document.querySelectorAll(".main_experience_div");
         
         for (let i = 0; i < allExperienceDiv.length; i++) {
             let experienceDiv = allExperienceDiv[i];
            experienceDiv.innerHTML = "Découvrir";;
            }
        currentDiv.firstElementChild.innerHTML = "Retour";
     },

     animationDivExperience: function()
    {
        let nodes  = document.querySelectorAll('.main_experience_li'),
        _nodes = [].slice.call(nodes, 0);

        _nodes.forEach(function (el) {
            el.addEventListener('mouseover', function (ev) {
                app.addClass( ev, this, 'in' );
            }, false);

            el.addEventListener('mouseout', function (ev) {
                app.addClass( ev, this, 'out' );
            }, false);
        });
    },

    getDirection: function(ev, obj)
    {
        let w = obj.offsetWidth,
        h = obj.offsetHeight,
        x = (ev.pageX - obj.offsetLeft - (w / 2) * (w > h ? (h / w) : 1)),
        y = (ev.pageY - obj.offsetTop - (h / 2) * (h > w ? (w / h) : 1)),
        d = Math.round( Math.atan2(y, x) / 1.57079633 + 5 ) % 4;

    return d;
    },

    addClass: function( ev, obj, state )
    {
        let divAnimation = document.querySelector('.container--rigth-main_experience_animation');

        
        let direction = app.getDirection( ev, obj ),
        class_suffix = "";

        obj.className = "";
       
    
        if(divAnimation.firstElementChild.className === "container--rigth-main_experience_flex")
        {
            
           switch ( direction ) {
                case 0 : class_suffix = '-top';    break;
                case 1 : class_suffix = '-right';  break;
                case 2 : class_suffix = '-bottom'; break;
                case 3 : class_suffix = '-left';   break;
            } 
        }
        
        return obj.classList.add( state + class_suffix );
    
    },


}

// On écoute le chargement COMPLET de la page et seulement à ce moment là, on exécute app.init()
document.addEventListener('DOMContentLoaded', app.init);