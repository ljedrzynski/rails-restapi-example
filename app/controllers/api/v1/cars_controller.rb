class Api::V1::CarsController < ApplicationController
  respond_to :html, :json
  include ApplicationHelper

  def index
    respond_with camelize_json_array(Car.all.as_json)
  end

  def show
    respond_with camelize_json_keys(Car.find(params[:id]).as_json)
  end

  def create
    @car = Car.new(car_params)
    respond_to do |format|
      if @car.save
        format.json { render :json => @car, :status => :ok }
      else
        format.json { render :json => @car, :status => :not_acceptable }
      end
    end
  end

  def destroy
    @car = Car.find(params[:id])
    @car.destroy
    respond_to do |format|
      format.json { render :json => @car, :status => :ok }
    end
  end

  def update
    @car = Car.update(params[:id], car_params)
    respond_to do |format|
      format.json { render :json => @car, :status => :ok }
    end
  end

  def car_params
    {:manufacturer => params[:manufacturer],
     :model => params[:model],
     :generation_id => params[:generationId],
     :production_start => params[:productionStart],
     :production_end => params[:productionEnd],
     :cylinder_number => params[:cylinderNumber],
     :engine_capacity => params[:engineCapacity],
     :horse_power => params[:horsePower],
     :description => params[:description]}
  end

end

