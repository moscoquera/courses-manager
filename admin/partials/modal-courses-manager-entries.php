<div id="modalCmCoursesEntries">
    <div class="main-containter" id="modalCmCoursesEntriesContent">
        <div class="col-7">
            <table id="cm-tree" class="table">
                <colgroup>
                    <col width="30px"></col>
                    <col width="*"></col>
                    <col width="50px"></col>
                </colgroup>
                <thead>
                <tr><th>#</th> <th>Name</th><th> </th> </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="col-3">
            <div class="form-group">
                <label><?php echo _('New Module','courses-manager') ?></label>
                <input type="text" class="form-control auto" id="cm_modal_new_module_txt" placeholder="<?php echo _('New module name'); ?>" />
                <?php echo get_submit_button(__('Add','courses-manager'),'button','cm_modal_new_module_btn',false,array('type'=>'button','role'=>'button','style'=>'float:right'))?>
            </div>
        </div>
    </div>
</div>