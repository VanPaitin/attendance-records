class CreateExtraInfos < ActiveRecord::Migration[6.0]
  def change
    create_table :extra_infos do |t|
      t.text :service_title
      t.references :adult_attendance, null: false, foreign_key: true

      t.timestamps
    end
  end
end
