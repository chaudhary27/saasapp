class ProfilesController < ApplicationController
  def new
    @profile = Profile.new
  end

  # POST TO /users/:user_id/profile
  def create
    # Ensure that we have user who is filling the form
    @user = User.find(params[:user_id])
    # Create profile linked to this user
    @profile = @user.build_profile(profile_params)
    if @profile.save
      flash[:success] = "Profile Updated"
      redirect_to user_path(params[:user_id])
    else
      render action: :new
    end
  end

  # GET to /users/:user_id/prodile/edit
  def edit
    @user = User.find(params[:user_id])
    @profile = @user.profile
  end


  private
    def profile_params
      params.require(:profile).permit(:first_name, :last_name, :avatar, :job_title, :phone_number, :contact_email, :description)
    end
end
