#!/usr/bin/ruby
# @Author: Nguyen The Thang
# @Date:   2016-12-03 16:04:22
# @Last Modified by:   Nguyen The Thang
# @Last Modified time: 2016-12-03 16:04:36
class Api::V1::ApiController < ApplicationController
  skip_before_action :verify_authenticity_token
end