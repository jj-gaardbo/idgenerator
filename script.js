(function($){

    let esmUrl = "https://forms.gle/HqK8BoisM2qwfmkr9";

    $(document).ready(function(){

        $('#letter').keyup(function(){
            $(this).val($(this).val().toUpperCase());
        });

        $('#color').keyup(function(){
            $(this).val($(this).val().toUpperCase());
        });

        $('#animal').keyup(function(){
            $(this).val($(this).val().toUpperCase());
        });

        let letter = window.localStorage.getItem('letter');
        let number = window.localStorage.getItem('number');
        let color = window.localStorage.getItem('color');
        let animal = window.localStorage.getItem('animal');

        if(letter !== "" && number !== "" && color !== "" && animal !== ""){
            $('#letter').val(letter);
            $('#number').val(number);
            $('#color').val(color);
            $('#animal').val(animal);
        }

        function copyToClipboard(element) {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val($(element).val()).select();
            document.execCommand("copy");
            $(".feedback-wrapper").removeClass('hidden');
            let feedback = $(".feedback-wrapper");
            feedback.animate({opacity: 0}, 3000, function(){
                feedback.addClass('hidden');
                feedback.css({opacity: 100});
            });
            $temp.remove();
        }

        $(document).on('click', '#generateID', function(){
            let inputs = $('#uniqueID').find('input');
            let letter = $('#letter').val().toUpperCase();
            let number = $('#number').val();
            let color = $('#color').val().toUpperCase();
            let animal = $('#animal').val().toUpperCase();

            window.localStorage.setItem('letter', letter);
            window.localStorage.setItem('number', number);
            window.localStorage.setItem('color', color);
            window.localStorage.setItem('animal', animal);


            let string = "";
            string += letter;
            string += number;
            string += color;
            string += animal;

            if(letter !== "" && number !== "" && color !== "" && animal !== ""){
                $('.result').removeClass('hidden');
                var trimStr = $.trim(string);
                $("#result button").val(trimStr);
                $("#result button").html(trimStr);

            }

            return false;
        });

        $(document).on('click', '#result button#generatedID', function() {
            copyToClipboard($(this));
        });

        var container = $('#result button');
        $('#export').click(function(){
            console.log(container.val())
            $(this).attr("href", 'data:text/plain;charset=utf-8,' + encodeURIComponent("-Unique participant ID: " + container.val() + "\n\n-Write this ID in the first input field of every entry of the ESM questionnaire.\n\n-You can find the questionnaire here: "+esmUrl));
            $(this).attr('download', container.val()+'.txt');
        });
    });

})(jQuery);