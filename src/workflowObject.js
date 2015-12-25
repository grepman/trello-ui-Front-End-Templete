//set body overflow hidden;
$("body").css("overflow", "hidden")



var Workflow_config = {};
Workflow_config.height = ($(document).height() - 30);


//fix the height of the workflow container
$('.Workflow-container').height(Workflow_config.height);

//init a basic workflow
var basic_workflow;

$(function() {
    $(".ul-parent").sortable({
        handle: '.handle',
        items: '> :not(.create_workspace)',
        placeholder: "highlight",
        start: function(event, ui) {
            ui.placeholder.height(ui.helper.outerHeight());
            ui.placeholder.width(ui.helper.outerWidth());
            console.log(ui, "ui")
        }
    }).disableSelection();
});

//basic initializing format
function init(workflowName) {

    var binder = function() {

        //for drag and drop of the workspaces
        $(function() {
            $(".ul-parent").sortable({
                handle: '.handle',
                //																		items: '> :not(.create_workspace)',
                placeholder: "highlight",
                start: function(event, ui) {
                    ui.placeholder.height(ui.helper.outerHeight());
                    ui.placeholder.width(ui.helper.outerWidth());
                    console.log(ui, "ui")
                }
            }).disableSelection();
        });

        //for shuffling of the cards
        $(function() {
            $("li #cards").sortable({
                connectWith: "li #cards",
                placeholder: "highlight",
                cancel: ".cancel_drag",
                items: '> :not(.cancel_drag)',
                start: function(event, ui) {
                    ui.placeholder.height(ui.helper.outerHeight());
                    ui.placeholder.width(ui.helper.outerWidth());
                    console.log(ui, "ui")
                }
            }).disableSelection();
        });

        (function($) {
            //bind modal window to add a card;
            $('.add-a-card').on("click", function() {
                //set modal Config
                $('.modalBox').modalBox({
                    width: 600,
                    height: 500,
                    top: 100,
                    iconImg: 'Close.png',
                    iconClose: false

                });
                $('.modalBox').modalBox('open');
                $('.modalBox').html("please add card")
            })
        })($);

        (function($) {
            //bind delete workspace
            $('.delete-workspace').off('click').on("click", function() {
                $(this).parent().parent().remove();
            });

        })($);
    }

    if (workflowName != '') {

        //for adding a workflow
        basic_workflow = '<li class="li-parent no_padding_bottom"><div class = "handle"><div class="name-of-workflow">' + workflowName + '</div><div class="delete-workspace"><span class="glyphicon glyphicon-trash">x</span></div></div>';
        basic_workflow += '<ul id="cards">';
        basic_workflow += '<li>Block</li><li>Block</li><li>Block</li><li>Block</li><li>Block</li><li class="cancel_drag"><div class="add-a-card">Add a card</div></li>';
        basic_workflow += '</ul></li>';

        //set input value to null
        $('#add_workflow').val('');

        binder();
        workflowName = '';
    } else {
        binder();
    }



} //!init()



$('#add_workflow').bind('keydown', function(e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        if (this.value === '') {
            init();
        } else {
            init(this.value);
            $(basic_workflow).insertBefore('#for_prepend_purpose');
            init();

        }

        $('.Workflow-container').animate({
            scrollLeft: 100000
        });

    }


});




function dumpAllElements() {
    //	var number_of_workflows = $('.li-parent').length -1;
    var output = [];
    var output_object = {};


    var total_cards = $('.li-parent ul li').length;
    var all_workspace_cards_array = [];
    var single_workspace_cards_array = [];
    for (var i = 0; i < total_cards; i++) {
        var current_card = $($('.li-parent ul li')[i]);

        if (current_card.attr('class') === 'cancel_drag') {
            all_workspace_cards_array.push(single_workspace_cards_array);
            single_workspace_cards_array = [];
        } else {
            single_workspace_cards_array.push(current_card.html());
        }

    }


    var number_of_workflows = $('.li-parent .handle .name-of-workflow').length;
    //	console.log(number_of_workflows)
    for (var i = 0; i < number_of_workflows; i++) {

        output_object.workflow_name = $($('.li-parent .handle .name-of-workflow')[i]).html();
        output_object.cards = all_workspace_cards_array[i];

        output.push(output_object);

        output_object = {};


    }

    for (var i = 0; i < number_of_workflows; i++) {
        output_object = $($('.li-parent .handle .name-of-workflow')[i]).html();


    }

    return output;
}


///* 
//*
//*	Core Workflow Trello Class
//*/
//WorkflowTrello = {};
//
////Config
//WorkflowTrello.config = {
//	
//};
//
////Workflow Output
//WorkflowTrello.output = {
//	
//};
//
////Workflow Temporaries
//WorkflowTrello.temp = {
//	
//};
//
////Workflow Initialize
//WorkflowTrello.init = function(){
//	
//};
//
////Create a List
//WorkflowTrello.createList = function(){
//
//	return true;
//};
//
////Create a Card
//WorkflowTrello.createCard = function(){
//	
//	return true;
//};
//
//
//