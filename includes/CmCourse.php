<?php


namespace CoursesManager;


class CmCourse
{

    public static function get_posts_columns($columns){

        unset($columns['date']);
        $columns['segments']=_('Segments','courses-manager');
        $columns['entries']=_('Entries','courses-manager');
        $columns['rating']=_('Rating','courses-manager');
        $columns['date']=_('Date','courses-manager');
        return $columns;

    }

}