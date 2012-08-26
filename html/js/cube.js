function set_all() {
    $('#face_one').addClass('leftFace');
    $('#face_two').addClass('topFace');
    $('#face_three').addClass('rightFace');
    $('#face_four').addClass('hidden');
    $('#face_five').addClass('hidden');

    $('.leftFace').click(function () {
        $('#face_one').addClass('topFace').removeClass('leftFace');
        $('#face_two').addClass('rightFace').removeClass('topFace');
        $('#face_three').addClass('hidden').removeClass('rightFace');
        $('#face_five').addClass('leftFace').removeClass('hidden');
    });
    
    $('.topFace').click(function () {

    });

}