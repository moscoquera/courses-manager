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

    public static function render_cm_entries_box(){
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/partials/metabox-courses-manager-entries.php';
        add_action('admin_footer',array(self::class,'render_cm_entries_modal'));
    }

    public static function render_cm_entries_modal(){
        require_once plugin_dir_path( dirname( __FILE__ ) )  . 'admin/partials/modal-courses-manager-entries.php';
    }

    public static function admin_metaboxes(String $post_type, \WP_Post $post){
        add_meta_box(
            'box-cm-entries',
            _('Course Segments and entries','courses-manager'),
            array(CmCourse::class,'render_cm_entries_box'),
            'cm-course',
            'side'
        );
    }



}