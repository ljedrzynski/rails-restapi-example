module ApplicationHelper
  require 'pp'

  def camelize_json_keys(object)
    camelized = Hash.new
    object.each do |key, value|
      camelized.store(key.camelize(:lower), value)
    end
    camelized
  end

  def camelize_json_array(object)
    if object.kind_of?(Array)
      camelized = Array.new
      object.each do |n|
        camelized.push(camelize_json_keys(n))
      end
      return camelized
    else
      return camelize_json_keys(object)
    end
  end
end
