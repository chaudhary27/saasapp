class Users::RegistrationsController < Devise::RegistrationsController
  # Extend default Devise gem behavior so that user signing up with pro
  # account with plan_id 2 save with special subs function
  # Otherwise devise saves as normal
  def create
    super do |resource|
      if params[:plan]
        resource.plan_id = params[:plan]
        if resource.plan_id == 2
          resource.save_with_subscription
        else
          resource.save
        end
      end
    end
  end
end
