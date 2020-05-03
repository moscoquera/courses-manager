<div class="modal fade " id="modalCmCoursesEntries" tabindex="-1" role="dialog" aria-labelledby="modalCmCoursesEntries" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"><?php echo _('Course Entries and modules','courses-manager'); ?></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-7">
                        <h3>Course Structure</h3>
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
                    <div class="col-sm-5">
                        <div class="form-group">
                            <label><?php echo _('New Module','courses-manager') ?></label>
                            <div class="form-row">
                                <div class="col-9">
                                    <input type="text" class="form-control auto" id="cm_modal_new_module_txt" placeholder="<?php echo _('New module name'); ?>" />
                                </div>
                                <div class="col-1">
                                    <button role="button" type="button" class="btn btn-primary" style="margin-left: 30px" id="cm_modal_new_module_btn"><?php echo _('Add','courses-manager')?></button>
                                </div>


                            </div>

                        </div>

                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger">Clear</button>
            </div>
        </div>
    </div>
</div>