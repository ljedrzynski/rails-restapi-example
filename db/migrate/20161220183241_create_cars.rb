class CreateCars < ActiveRecord::Migration
  def change
    create_table :cars do |t|
      t.string :manufacturer
      t.string :model
      t.string :generation_id
      t.date :production_start
      t.date :production_end
      t.integer :cylinder_number
      t.decimal :engine_capacity
      t.integer :horse_power
      t.string :description

      t.timestamps null: false
    end
  end
end
