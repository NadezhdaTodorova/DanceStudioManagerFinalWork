﻿
$(document).ready(function () {

    var dateFrom = "";
    var dateTo = "";
    var classGenre = "";
    var level = "";

    createGrid();

    $("#DateFrom").datepicker({ autoclose: true, todayBtn: 'linked' })
    $("#DateTo").datepicker({ autoclose: true, todayBtn: 'linked' })
});


var grid_selector = "#jqGrid";
var pager_selector = "#jqGridPager";

$("#SearchProfitForClass").click(function (e) {
    e.preventDefault();
    var formDataSearch = getMyAppsDataFromScreen();
    var $grid1 = $(grid_selector);
    $grid1.jqGrid('clearGridData').jqGrid('setGridParam',
        {
            url: '/Reports/SearchProfitForPeriod?dateFrom=' + formDataSearch.dateFrom + '&dateTo=' + formDataSearch.dateTo + '&classGenre=' + formDataSearch.classGenre + '&level=' + formDataSearch.level,
            search: false
        }).trigger("reloadGrid");
});

function getMyAppsDataFromScreen() {
    var formDataSearch = {};

    var dateFrom = $('#DateFrom').val();
    if (!dateFrom || dateFrom.length === 0)
        formDataSearch.dateFrom = null;
    else
        formDataSearch.dateFrom = dateFrom;

    var dateTo = $('#DateTo').val();
    if (!dateTo || dateTo.length === 0)
        formDataSearch.dateTo = null;
    else
        formDataSearch.dateTo = dateTo;

    var classGenre = $('#ClassGenre').val();
    if (!classGenre || classGenre.length === 0)
        formDataSearch.classGenre = null;
    else
        formDataSearch.classGenre = classGenre;

    var level = $('#Level').val();
    if (!level || level.length === 0)
        formDataSearch.level = null;
    else
        formDataSearch.level = level;

    return formDataSearch;
}

function createGrid() {
    jQuery(grid_selector).jqGrid({
        datatype: "json",
        height: 450,
        type: "Get",
        colNames: ['Class genre', 'Level', 'Type', 'Number of students', 'Instructors', 'Profit'],
        colModel: [
            { name: 'classGenre', index: 'ClassGenre', width: 200, firstsortorder: "desc" },
            { name: 'level', index: 'Level', width: 200 },
            { name: 'type', index: 'Type', width: 200 },
            { name: 'numberOfStudents', index: 'NumberOfStudents', width: 250 },
            { name: 'instructors', index: 'Instructors', width: 250 },
            { name: 'profit', index: 'Profit', width: 150 }
        ],
        rowNum: 10,
        rowList: [10, 20, 30],
        pager: pager_selector,
        altRows: true,
        multiselect: true,
    }).navGrid('#jqGridPager', { add: false, edit: true, del: true, search: false, refresh: true });
};