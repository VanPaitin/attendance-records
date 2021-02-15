module Api
  module V1
    class InvitesController < ApplicationController
      before_action :ensure_admin

      def index
        render json: Invitation.page(params[:page]), status: 200
      end

      def create
        email, role_id = params.require([:email, :role_id])

        if user = User.find_by(email: email)
          role = Role.find(role_id)

          user.roles << role unless user.roles.exists? role

          render json: { success: 'Role successfully added to existing user' }
        else
          invite = Invite.new(email: email, role_id: role_id)

          if invite.save
            InviteMailer.with(email: email, token: invite.token).invite_user.deliver

            render json: { success: 'Invite email successfully sent to user' }
          else
            render json: { errors: invite.errors }, status: 422
          end
        end
      end

      def resend
        user_email = params.require(:email)

        if Invite.find_by(email: user_email)
          InviteMailer.with(email: user_email, token: invite.token).invite_user.deliver

          render json: { success: 'Invite email successfully re-sent to user' }
        else
          render json: { error: 'User not found' }, status: 404
        end
      end

      def destroy
        invite = Invite.find params[:id]

        if invite.recepient_id
          render json: { error: 'User has already accepted this invitation.' }, status: 422
        else
          invite.destroy

          head 204
        end
      end
    end
  end
end
