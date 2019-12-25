class CreateExtraInfos < ActiveRecord::Migration[6.0]
  def change
    create_table :extra_infos do |t|
      t.text :service_title
      t.string :attendance_type
      t.bigint :attendance_id

      t.timestamps
    end
  end
end
