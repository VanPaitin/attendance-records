class CreateNonAdultAttendances < ActiveRecord::Migration[6.0]
  def change
    create_table :non_adult_attendances do |t|
      t.date :day
      t.references :service, null: false, foreign_key: true
      t.string :type
      t.integer :male
      t.integer :female

      t.timestamps
    end
  end
end
