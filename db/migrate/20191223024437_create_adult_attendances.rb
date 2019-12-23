class CreateAdultAttendances < ActiveRecord::Migration[6.0]
  def change
    create_table :adult_attendances do |t|
      t.date :day
      t.references :service, null: false, foreign_key: true
      t.integer :male
      t.integer :female
      t.integer :children
      t.jsonb :online
      t.jsonb :newcomers
      t.jsonb :decisions

      t.timestamps
    end
  end
end
